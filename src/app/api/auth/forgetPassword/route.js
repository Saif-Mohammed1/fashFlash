import {
  forgetPassword,
  restPassword,
} from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import { connectDB } from "@/app/server/db/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectDB();
    //   .then((re) => //console.log("success connect to db"))
    //   .catch((re) => //console.log("failed connect to db"));

    const { message, statusCode } = await forgetPassword(req);

    return NextResponse.json(
      {
        message,
      },
      { status: statusCode }
    );
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
export const PATCH = async (req) => {
  try {
    await connectDB();
    //   .then((re) => //console.log("success connect to db"))
    //   .catch((re) => //console.log("failed connect to db"));

    const { message, statusCode } = await restPassword(req);

    return NextResponse.json(
      {
        message,
      },
      { status: statusCode }
    );
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
