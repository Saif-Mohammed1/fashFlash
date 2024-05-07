import AppError from "@/component/util/appError";
import Product from "../models/product.model";

let sending = false;
export const createCart = async (req, Model) => {
  try {
    if (sending) {
      sending = false;
      throw new AppError("FromPlease take a while between each request", 400);
    }
    sending = true;
    let doc = await Model.findOne({
      user: req.user._id,
      product: req.id,
    });
    if (!doc) {
      doc = await Model.create({
        user: req.user._id,
        product: req.id,
      });
    }
    return {
      data: doc,
      statusCode: 201,
    };
  } catch (error) {
    throw error;
  } finally {
    sending = false;
  }
};
// export const updateCart = async (req, Model) => {
//   try {
//     const { quantity } = await req.json();
//     if (!quantity) throw new AppError("quantity not exist ", 404);

//     // const doc = await Model.findByIdAndUpdate(req.id, quantity, {
//     //   new: true,
//     //   runValidators: true,
//     // });
//     const doc = await Model.findOneAndUpdate(
//       { product: req.id, user: req.user._id }, // Condition to find the document
//       { quantity }, // Updated fields
//       { new: true, runValidators: true } // Options: return the updated document and run validators
//     );

//     if (!doc) {
//       throw new AppError("No document found with that ID", 404);
//       // return NextResponse.json(
//       //   { message: "No document found with that ID" },
//       //   { status: 404 }
//       // );
//       // throw new AppError("No document found with that ID", 404);
//     }

//     return { data: doc, statusCode: 200 };
//     // return NextResponse.json(
//     //   {
//     //     data: doc,
//     //   },
//     //   { status: 200 }
//     // );
//   } catch (error) {
//     throw error;

//   }
// };

export const updateCart = async (req, Model) => {
  try {
    if (sending) {
      sending = false;

      throw new AppError("FromPlease take a while between each request", 400);
    }
    sending = true;
    const { quantity } = await req.json(); // Assuming you get the quantity from the request body

    if (quantity == 0) {
      await deleteCart(req, Model);
      return { data: null, statusCode: 200 }; // Ensure data property is included
    }
    if (!quantity) throw new AppError("Quantity not provided", 404);

    // Find the cart item to get the product ID
    const cartItem = await Model.findOne({
      product: req.id,
      user: req.user._id,
    });
    if (!cartItem) throw new AppError("Cart item not found", 404);

    // Now, find the product to check its stock
    const product = await Product.findById(cartItem.product);
    if (!product) throw new AppError("Product not found", 404);

    // Check if the requested quantity is less than or equal to the product's stock
    if (quantity > product.stock) {
      throw new AppError(
        `Requested quantity exceeds available stock. Available stock: ${product.stock}`,
        400
      );
    }

    // If the stock check passes, update the cart item with the new quantity
    const updatedCartItem = await Model.findOneAndUpdate(
      { _id: cartItem._id }, // Using the cart item ID for updating
      { quantity }, // Updated fields
      { new: true, runValidators: true } // Options: return the updated document and run validators
    );

    // Check if the update operation was successful
    if (!updatedCartItem) {
      throw new AppError("Failed to update cart item", 500);
    }
    // sending = false;

    return { data: updatedCartItem, statusCode: 200 };
  } catch (error) {
    throw error;
  } finally {
    sending = false;
  }
};

export const deleteCart = async (req, Model) => {
  try {
    if (sending) {
      sending = false;

      throw new AppError("FromPlease take a while between each request", 400);
    }
    sending = true;
    const doc = await Model.findOneAndDelete(
      { product: req.id, user: req.user._id } // Condition to find the document
    );

    if (!doc) {
      throw new AppError("No document found with that ID", 404);
    }
    // sending = false;

    return {
      data: null,
      statusCode: 200,
    };
  } catch (error) {
    throw error;
  } finally {
    sending = false;
  }
};
