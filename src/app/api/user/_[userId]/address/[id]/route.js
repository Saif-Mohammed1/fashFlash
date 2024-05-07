import { isAuth } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import {
  deleteOne,
  updateOne,
} from "@/app/server/controller/factoryController";
import { connectDB } from "@/app/server/db/db";
import Address from "@/app/server/models/address.model";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  req.id = params.id;

  try {
    await connectDB();
    await isAuth(req);
    const { data, statusCode } = await deleteOne(req, Address);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
export const PATCH = async (req, { params }) => {
  req.id = params.id;

  try {
    await connectDB();
    await isAuth(req);
    const { data, statusCode } = await updateOne(req, Address);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
