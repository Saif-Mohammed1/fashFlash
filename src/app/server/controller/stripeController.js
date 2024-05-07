import AppError from "@/component/util/appError";
import Stripe from "stripe";
import Product from "../models/product.model";
import Order from "../models/order.model ";
import { sendEmailWithInvoice } from "@/component/util/email";
const stripe = new Stripe(process.env.STRIPE_SECRET); // Replace `process.env.STRIPE_SECRET_KEY` with your actual secret key

const fetchActiveProducts = async () => {
  try {
    const products = await stripe.products.list(); // Use the stripe client instance to call the API
    const activeProducts = products.data.filter((product) => product.active);
    return activeProducts;
  } catch (error) {
    throw new AppError("Could not fetch active products", 400);
  }
};

export const createStripeProduct = async (req) => {
  try {
    const { products, shippingInfo } = await req.json(); // Assuming 'products' is an array of product objects from the request body
    // Optionally, create a new tax rate or use an existing tax rate ID
    const taxRate = await stripe.taxRates.create({
      display_name: "Standard Tax",
      description: "10% Sales Tax",
      jurisdiction: shippingInfo.country || "US",
      percentage: 10.0,
      inclusive: false, // false means the tax is added on top of the pricing
    });

    const shippingRates = {
      USA: 500, // $5.00 in cents
      Egypt: 1500, // $15.00 in cents
      India: 1300, // $13.00 in cents
      Brazil: 1200, // $12.00 in cents
      UK: 700, // $7.00 in cents
      Germany: 800, // $8.00 in cents
      Australia: 1500, // $15.00 in cents
      Japan: 1000, // $10.00 in cents
      Canada: 500, // $5.00 in cents
      "South Africa": 1400, // $14.00 in cents
      default: 1000, // $10.00 in cents if country is not listed
    };

    // Get the country specific shipping rate, or the default rate if country is not listed
    const shippingCost =
      shippingRates[shippingInfo.country] || shippingRates["default"];

    const lineItemsPromises = products.map(async (item) => {
      const product = await Product.findById(item._id);
      if (!product) {
        throw new AppError(
          `Product ${item.name} is not available anymore please remove it from your cart for success payment `,
          400
        );
      }
      if (product.stock < item.quantity) {
        throw new AppError(`Insufficient stock for product ${item.name}`, 400);
      }
      if (product) {
        const unitAmount = Math.round(
          (product.discount
            ? product.price - product.discount
            : product.price) * 100
        ); // Convert dollars to cents
        const id = product?._id.toString();
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              images: [item.images ? item.images[0] : null],
              metadata: { _id: id },
            },
            unit_amount: unitAmount,
          },
          quantity: item.quantity,
          tax_rates: [taxRate.id], // Attach the tax rate to each line item
        };
      }
    });
    const lineItems = await Promise.all(lineItemsPromises);

    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: `Shipping to ${shippingInfo.country}`,
          metadata: {
            description: `Shipping costs for ${shippingInfo.country}`,
          },
        },
        unit_amount: shippingCost,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: req.user.email,
      client_reference_id: req.user._id, // This ensures receipt emails are set up
      line_items: lineItems.filter(Boolean),
      mode: "payment",
      success_url: `${req.headers.get(
        "origin"
      )}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/cancel`,
      payment_intent_data: {
        receipt_email: req.user.email,
        shipping: {
          name: req.user.name,
          address: {
            line1: shippingInfo.street,
            city: shippingInfo.city,
            state: shippingInfo.state,
            postal_code: shippingInfo.zipCode,
            country: shippingInfo.country,
          },
        },
      },

      metadata: {
        shipping_info: `Shipping cost: $${(shippingCost / 100).toFixed(2)} to ${
          shippingInfo.country
        }`,
        shippingInfo: JSON.stringify(shippingInfo),
      },
      invoice_creation: {
        enabled: true,
        invoice_data: {
          custom_fields: [
            {
              name: "Order Information",
              value: "Thank you for your purchase!",
            },
          ],
          description: "Detailed description of the invoice",
          footer:
            "Thank you for choosing Website. For any inquiries, please contact us at example@company.co.",
          // You can add other fields as needed
        },
      },
    });
    return {
      sessionId: session.id,
      url: session.url,
      statusCode: 200,
    };
  } catch (error) {
    throw error;
    // throw new AppError("Error creating products", 500);
  }
};

export const captureSuccessPayment = async (req, sessionId) => {
  let doc;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Process the payment session details
    const { payment_status, invoice } = session;

    if (payment_status === "paid" && invoice) {
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        {
          expand: ["data.price.product"],
        }
      );

      const invoiceDe = await stripe.invoices.retrieve(invoice);
      const existingInvoice = await Order.findOne({
        invoiceId: invoiceDe.number,
        user: req?.user?._id,
      });

      if (!existingInvoice) {
        lineItems.data.forEach(async (item) => {
          const productId = item.price.product.metadata._id; // Assuming you stored _id in metadata
          const quantity = item.quantity;
          const product = await Product.findById(productId);

          if (product) {
            product.stock -= quantity;
            await product.save();
          }
        });
        const shippingId = JSON.parse(session.metadata.shippingInfo)._id;

        doc = await Order.create({
          user: req?.user?._id,
          invoiceId: invoiceDe.number,
          invoiceLink: invoiceDe.hosted_invoice_url,
          amount: session.amount_total / 100,

          shippingInfo: shippingId,
        });
        await sendEmailWithInvoice(req?.user, invoiceDe.hosted_invoice_url);
        return { session, statusCode: 200 };
      }
    } else {
      throw new AppError("you need to complete your payment", 400);
    }
    return { data: null, statusCode: 200 };
  } catch (error) {
    if (doc) {
      await Order.findByIdAndDelete(doc._id);
    }
    throw error;
  }
};
