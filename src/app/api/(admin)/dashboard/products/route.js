import { isAuth, restrictTo } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import { getAll } from "@/app/server/controller/factoryController";
import { connectDB } from "@/app/server/db/db";
import Product from "@/app/server/models/product.model";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectDB();
    await isAuth(req);
    await restrictTo(req, "admin");

    const { data, statusCode, pageCount, allData } = await getAll(req, Product);

    return NextResponse.json(
      { data, pageCount, allData },
      { status: statusCode }
    );
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
