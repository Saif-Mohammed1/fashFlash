import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: [true, "Order must belong to a user."],
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "completed", "failed", "processing"],
    default: "pending",
  },
  invoiceId: {
    type: String,
    required: [true, "Invoice ID field is required."],
  },
  invoiceLink: {
    type: String,
    required: [true, "Invoice Link field is required."],
  },
  amount: {
    type: Number,
    required: [true, "amount Link field is required."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  shippingInfo: {
    type: Schema.ObjectId,
    ref: "Address",
    required: [true, "Order must belong to a Address."],
  },
});
OrderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
  }).populate({
    path: "shippingInfo",
  });

  // this.populate({
  //   path: "user",
  //   select: "name photo",
  // });
  next();
});

OrderSchema.post(/^find/, function (docs, next) {
  // Ensure `docs` is an array (it should be for `find`)
  if (Array.isArray(docs)) {
    // Filter out documents where `product` is null
    const filteredDocs = docs.filter((doc) => doc.user !== null);
    // You cannot just replace `docs` with `filteredDocs`, as `docs` is what the caller receives
    // You would need to mutate `docs` directly if you need to change the actual array being passed back
    docs.splice(0, docs.length, ...filteredDocs);
  }
  next();
});
const Order = models.Order || model("Order", OrderSchema);

export default Order;
