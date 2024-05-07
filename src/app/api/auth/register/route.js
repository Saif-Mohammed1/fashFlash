import { register } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import { connectDB } from "@/app/server/db/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectDB();
    // .then((re) => //console.log("success connect to db"))
    // .catch((re) => //console.log("failed connect to db"));
    const { message, token, statusCode } = await register(req);

    return NextResponse.json(
      {
        message,
        token,
      },
      { status: statusCode }
    );
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
