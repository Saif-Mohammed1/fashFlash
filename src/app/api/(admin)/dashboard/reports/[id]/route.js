import { isAuth, restrictTo } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import {
  deleteOne,
  updatePaymentStatus,
} from "@/app/server/controller/factoryController";
import { connectDB } from "@/app/server/db/db";
import Report from "@/app/server/models/report.model";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  req.id = params.id;
  try {
    await connectDB();
    await isAuth(req);
    await restrictTo(req, "admin");

    const { data, statusCode } = await updatePaymentStatus(req, Report);

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

    const { data, statusCode } = await deleteOne(req, Report);

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
