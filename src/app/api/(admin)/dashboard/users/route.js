import { isAuth, restrictTo } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import { getAll } from "@/app/server/controller/factoryController";
import { createUserByAdmin } from "@/app/server/controller/userController";
import { connectDB } from "@/app/server/db/db";
import User from "@/app/server/models/user.model";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectDB();
    await isAuth(req);
    await restrictTo(req, "admin");

    const { data, statusCode, pageCount, allData } = await getAll(req, User);
    return NextResponse.json(
      { data, pageCount, allData },
      { status: statusCode }
    );
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
export const POST = async (req) => {
  try {
    await connectDB();
    await isAuth(req);
    await restrictTo(req, "admin");
    const { message, token, statusCode } = await createUserByAdmin(req);

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
