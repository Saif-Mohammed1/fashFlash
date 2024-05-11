// export const revalidate = 0;
// export const dynamic = "force-dynamic";

import { isAuth, restrictTo } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import { getOne, updateOne } from "@/app/server/controller/factoryController";
import { deleteProductByUser } from "@/app/server/controller/userController";
import { connectDB } from "@/app/server/db/db";
import Product from "@/app/server/models/product.model";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  req.id = params.id;

  try {
    await connectDB();

    //.catch(() => //console.log("couldn't connect to db"));
    // await isAuth(req);
    const { data, statusCode } = await getOne(req, Product, {
      path: "reviews",
    });
    // revalidatePath(req.url);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};

export const PUT = async (req, { params }) => {
  req.id = params.id;

  try {
    await connectDB();
    //.catch(() => //console.log("couldn't connect to db"));
    await isAuth(req);
    restrictTo(req, "admin", "seller");
    const { data, statusCode } = await updateOne(req, Product);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);

    // //console.log("error PATCH", error);
    // return NextResponse.json(
    //   {
    //     message: error.message,
    //   },
    //   { status: error.statusCode }
    // );
  }
};
export const DELETE = async (req, { params }) => {
  req.id = params.id;
  try {
    await connectDB();
    //.catch(() => //console.log("couldn't connect to db"));
    await isAuth(req);
    restrictTo(req, "seller");
    const { data, statusCode } = await deleteProductByUser(req, Product);
    return NextResponse.json({ data }, { status: statusCode });
  } catch (error) {
    return ErrorHandler(error, req);

    // //console.log("error DELETE", error);
    // return NextResponse.json(
    //   {
    //     message: error.message,
    //   },
    //   { status: error.statusCode }
    // );
  }
};
