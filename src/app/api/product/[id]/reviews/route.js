import { isAuth, restrictTo } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import { getAll } from "@/app/server/controller/factoryController";
import { createReviews } from "@/app/server/controller/reviewsController";
import { connectDB } from "@/app/server/db/db";
import Reviews from "@/app/server/models/review.model";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  req.id = params.id;

  try {
    await connectDB();
    //.catch(() => //console.log("couldn't connect to db"));
    // await isAuth(req);
    const { data, statusCode } = await getAll(req, Reviews);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};

export const POST = async (req, { params }) => {
  req.id = params.id;

  try {
    await connectDB();
    await isAuth(req);

    //.catch(() => //console.log("couldn't connect to db"));
    // await isAuth(req);
    const { data, statusCode } = await createReviews(req, Reviews);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
