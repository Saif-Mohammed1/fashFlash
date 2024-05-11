import { isAuth } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import { updateUserPhoto } from "@/app/server/controller/userController";
import { connectDB } from "@/app/server/db/db";
import User from "@/app/server/models/user.model";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
  //   const { userId } = params;
  //   req.userId = userId;
  try {
    await connectDB();
    await isAuth(req);

    const { data, statusCode } = await updateUserPhoto(req, User);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
