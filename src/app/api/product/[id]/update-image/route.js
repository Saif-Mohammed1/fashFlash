import { isAuth, restrictTo } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import { updateProductImage } from "@/app/server/controller/productController";
import { connectDB } from "@/app/server/db/db";
import Product from "@/app/server/models/product.model";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  req.id = params.id;
  try {
    await connectDB();
    //.catch(() => //console.log("couldn't connect to db"));
    await isAuth(req);
    restrictTo(req, "admin", "seller");
    const { data, statusCode } = await updateProductImage(req, Product);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);

    // //console.log("error PATCH", error);
    // return NextResponse.json(
    //   {
    //     message: error.message,
    //   },
    //   { status: error.statusCode }
    // );
  }
};
