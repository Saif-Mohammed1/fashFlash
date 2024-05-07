import { isAuth, restrictTo } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import { deleteProduct } from "@/app/server/controller/productController";
import { connectDB } from "@/app/server/db/db";
import Product from "@/app/server/models/product.model";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  req.id = params.id;
  try {
    await connectDB();
    await isAuth(req);
    await restrictTo(req, "admin");

    const { data, statusCode } = await deleteProduct(req, Product);

    return NextResponse.json(
      {
        data,
      },
      { status: statusCode }
    );
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
