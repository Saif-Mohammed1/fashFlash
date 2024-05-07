import { isAuth } from "@/app/server/controller/authController";
import {
  createCart,
  deleteCart,
  updateCart,
} from "@/app/server/controller/cartController";
import ErrorHandler from "@/app/server/controller/errorController";
import { connectDB } from "@/app/server/db/db";
import Cart from "@/app/server/models/cart.model";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  req.id = params.id;
  try {
    await connectDB();
    await isAuth(req);
    const { data, statusCode } = await createCart(req, Cart);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
export const PUT = async (req, { params }) => {
  req.id = params.id;
  try {
    await connectDB();
    await isAuth(req);
    const { data, statusCode } = await updateCart(req, Cart);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
export const DELETE = async (req, { params }) => {
  req.id = params.id;
  try {
    await connectDB();
    await isAuth(req);
    const { data, statusCode } = await deleteCart(req, Cart);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
