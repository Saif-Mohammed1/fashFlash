import { updatePassword } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import { connectDB } from "@/app/server/db/db";
import { NextResponse } from "next/server";

export const PATCH = async (req) => {
  //   const { userId } = params;
  //   req.userId = userId;
  try {
    await connectDB();
    const { data, statusCode } = await updatePassword(req);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
