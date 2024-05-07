import { isAuth } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import {
  verifyEmail,
  sendNewVerificationCode,
} from "@/app/server/controller/userController";
import { connectDB } from "@/app/server/db/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  //   const { userId } = params;
  //   req.userId = userId;
  try {
    await connectDB();
    await isAuth(req);

    const { message, statusCode } = await sendNewVerificationCode(req);
    return NextResponse.json({ message }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};

export const PUT = async (req) => {
  //   const { userId } = params;
  //   req.userId = userId;
  try {
    await connectDB();
    await isAuth(req);
    const { message, statusCode } = await verifyEmail(req);
    return NextResponse.json({ message }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
