import { NextResponse } from "next/server";
import { isAuth } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import { connectDB } from "@/app/server/db/db";
import Report from "@/app/server/models/report.model";
import { createReport } from "@/app/server/controller/reportController";

export const POST = async (req, { params }) => {
  req.id = params.id;
  try {
    await connectDB();
    await isAuth(req);
    const { data, statusCode } = await createReport(req, Report);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    // //console.log("error Get", error);
    return ErrorHandler(error, req);
  }
};
