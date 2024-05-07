import { isAuth, restrictTo } from "@/app/server/controller/authController";
import { connectDB } from "@/app/server/db/db";
import Product from "@/app/server/models/product.model";
import {
  getAll,
  getUniqueCategories,
} from "@/app/server/controller/factoryController";
import { NextResponse } from "next/server";
import ErrorHandler from "@/app/server/controller/errorController";
import { createProduct } from "@/app/server/controller/productController";
// import dumy from "../../../../dumy.json";
export const GET = async (req) => {
  try {
    await connectDB();
    //console.log("product called");

    const { categories } = await getUniqueCategories(Product);
    const { data, pageCount, statusCode } = await getAll(req, Product);

    return NextResponse.json(
      { data, pageCount, categories },
      { status: statusCode }
    );
  } catch (error) {
    // //console.log("error Get", error);
    return ErrorHandler(error, req);
  }
};
// Your existing POST endpoint with multer middleware for file uploads
export const POST = async (req) => {
  try {
    await connectDB();
    await isAuth(req);

    restrictTo(req, "admin", "seller");
    // const data = dumy.map((pro) =>
    //   Product.create({
    //     ...pro,
    //     user: req.user._id,
    //   })
    // );
    // await Promise.all(data);
    const { data, statusCode } = await createProduct(req, Product);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
/*
// Updated POST handler with multer integration for multiple image files
export const POST = async (req) => {
  try {
    await connectDB();
    await isAuth(req);

    // Use multer middleware to handle multiple image file uploads
    upload.array("images", 5)(req, {}, async function (err) {
      if (err) {
        throw new Error(err.message); // Throw an error if file upload fails
      }

      const { data, statusCode } = await createOne(req, Product);
      return NextResponse.json({ data }, { status: statusCode });
    });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};*/
