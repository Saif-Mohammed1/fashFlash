import { isAuth } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import { createOne } from "@/app/server/controller/factoryController";
import { connectDB } from "@/app/server/db/db";
import ContactUs from "@/app/server/models/contactUs.model";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    //console.log("called Refund");
    await connectDB();
    await isAuth(req);

    const { data, statusCode } = await createOne(req, ContactUs);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
