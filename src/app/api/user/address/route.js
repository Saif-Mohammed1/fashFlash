import { isAuth } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import {
  createOne,
  getDataByUser,
} from "@/app/server/controller/factoryController";
import { connectDB } from "@/app/server/db/db";
import Address from "@/app/server/models/address.model";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectDB();
    await isAuth(req);

    const { data, statusCode } = await getDataByUser(req, Address);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
export const POST = async (req) => {
  try {
    await connectDB();
    await isAuth(req);
    const { data, statusCode } = await createOne(req, Address);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
