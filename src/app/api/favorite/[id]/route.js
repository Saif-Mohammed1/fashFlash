import { NextResponse } from "next/server";
import { isAuth } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import {
  createFav,
  deleteFav,
} from "@/app/server/controller/favoriteController";
import { connectDB } from "@/app/server/db/db";
import Favorite from "@/app/server/models/favorite.model";

export const POST = async (req, { params }) => {
  req.id = params.id;
  try {
    await connectDB();
    await isAuth(req);
    const { data, statusCode } = await createFav(req, Favorite);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    // //console.log("error Get", error);
    return ErrorHandler(error, req);
  }
};
export const DELETE = async (req, { params }) => {
  req.id = params.id;
  try {
    await connectDB();
    await isAuth(req);
    const { data, statusCode } = await deleteFav(req, Favorite);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    // //console.log("error Get", error);
    return ErrorHandler(error, req);
  }
};
