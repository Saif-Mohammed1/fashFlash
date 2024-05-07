import { isAuth, restrictTo } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import {
  deleteUserByAdmin,
  editUserByAdmin,
} from "@/app/server/controller/userController";
import { connectDB } from "@/app/server/db/db";
import User from "@/app/server/models/user.model";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  req.id = params.id;
  try {
    await connectDB();
    await isAuth(req);
    await restrictTo(req, "admin");

    const { data, statusCode } = await editUserByAdmin(req, User);

    return NextResponse.json(
      {
        data,
      },
      { status: statusCode }
    );
  } catch (error) {
    return ErrorHandler(error, req);
  }
};

export const DELETE = async (req, { params }) => {
  req.id = params.id;
  try {
    await connectDB();
    await isAuth(req);
    await restrictTo(req, "admin");

    const { data, statusCode } = await deleteUserByAdmin(req, User);

    return NextResponse.json(
      {
        data,
      },
      { status: statusCode }
    );
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
