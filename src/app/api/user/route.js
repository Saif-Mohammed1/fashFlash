import { isAuth, updatePassword } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import { updateOne } from "@/app/server/controller/factoryController";
import { deleteUser } from "@/app/server/controller/userController";
import { connectDB } from "@/app/server/db/db";
import User from "@/app/server/models/user.model";
import { NextResponse } from "next/server";

/// get address by user id move it to address get

export const PATCH = async (req) => {
  //   const { userId } = params;
  //   req.userId = userId;
  try {
    await connectDB();
    await isAuth(req);
    req.id = req.user._id;
    const { data, statusCode } = await updateOne(req, User);
    return NextResponse.json({ data }, { status: statusCode });
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

    const { data, statusCode } = await updatePassword(req, User);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
export const DELETE = async (req) => {
  //   const { userId } = params;
  //   req.userId = userId;
  try {
    await connectDB();
    await isAuth(req);

    const { data, statusCode } = await deleteUser(req, User);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
