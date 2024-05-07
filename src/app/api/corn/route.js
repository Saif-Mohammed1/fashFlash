import ErrorHandler from "@/app/server/controller/errorController";
import { connectDB } from "@/app/server/db/db";
import Cart from "@/app/server/models/cart.model";
import Favorite from "@/app/server/models/favorite.model";
import Product from "@/app/server/models/product.model";
import User from "@/app/server/models/user.model";
import { NextResponse } from "next/server";
import cron from "node-cron";

export const GET = async (req) => {
  // cron.schedule("0 0 * * *", async () => {
  try {
    await connectDB();

    // Find all products
    const products = await Product.find();

    // Iterate through each product
    for (const product of products) {
      // Check if the user associated with the product exists
      const user = await User.findById(product.user);
      if (!user) {
        // If the user doesn't exist, delete the product
        await Product.findByIdAndDelete(product._id);
        await Cart.deleteMany({ product: product._id });
        await Favorite.deleteMany({ product: product._id });
      }
    }

    await Product.updateMany(
      { discountExpire: { $lt: new Date() } },
      { $set: { discount: 0 }, $unset: { discountExpire: 1 } }
    );
    return NextResponse.json({ message: "done" }, { status: 200 });
  } catch (error) {
    return ErrorHandler(error, req);
  }
  // });
};
