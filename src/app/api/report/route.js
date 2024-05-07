import { NextResponse } from "next/server";
import { isAuth } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import { connectDB } from "@/app/server/db/db";
import Report from "@/app/server/models/report.model";
import { getDataByUser } from "@/app/server/controller/factoryController";

export const GET = async (req) => {
  try {
    await connectDB();
    await isAuth(req);
    const { data, statusCode } = await getDataByUser(req, Report);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    // //console.log("error Get", error);
    return ErrorHandler(error, req);
  }
};
