import { NextResponse } from "next/server";
import ErrorHandler from "@/app/server/controller/errorController";
import { connectDB } from "@/app/server/db/db";
import Favorite from "@/app/server/models/favorite.model";
import { isAuth } from "@/app/server/controller/authController";
import { getFav } from "@/app/server/controller/favoriteController";
//import { getDataByUser } from "@/app/server/controller/factoryController";
export const GET = async (req) => {
  try {
    await connectDB();

    await isAuth(req);
    // const { data, statusCode } = await getDataByUser(req, Favorite, {
    //   path: "product",
    //   //   select: "name _id photo",
    // });
    const { data, statusCode } = await getFav(req, Favorite, {
      path: "product",
      //   select: "name _id photo",
    });
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    // //console.log("error Get", error);
    return ErrorHandler(error, req);
  }
};
