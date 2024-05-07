import { isAuth } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import { checkReview } from "@/app/server/controller/reviewsController";
import { connectDB } from "@/app/server/db/db";
import Reviews from "@/app/server/models/review.model";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  req.id = params.id;

  try {
    await connectDB();
    //.catch(() => //console.log("couldn't connect to db"));
    await isAuth(req);

    //console.log("req.user", req.user);
    const { data, statusCode } = await checkReview(req, Reviews);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
