import { isAuth } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import { getDataByUser } from "@/app/server/controller/factoryController";
import { connectDB } from "@/app/server/db/db";
import Product from "@/app/server/models/product.model";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  //   const { userId } = params;
  //   req.userId = userId;
  try {
    await connectDB();
    await isAuth(req);

    const { data, statusCode } = await getDataByUser(req, Product);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
