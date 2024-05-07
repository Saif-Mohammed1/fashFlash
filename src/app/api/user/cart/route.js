import { isAuth } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import { getDataByUser } from "@/app/server/controller/factoryController";
import { connectDB } from "@/app/server/db/db";
import Cart from "@/app/server/models/cart.model";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectDB();
    await isAuth(req);

    //console.log("called");
    const { data, statusCode } = await getDataByUser(req, Cart, {
      path: "product user",
    });
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
