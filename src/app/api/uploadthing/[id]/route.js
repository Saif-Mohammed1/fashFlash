import { isAuth, restrictTo } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export const DELETE = async (req, { params }) => {
  const id = params.id;
  const utapi = new UTApi();
  try {
    await isAuth(req);

    restrictTo(req, "admin", "seller");
    // const data = dumy.map((pro) =>
    //   Product.create({
    //     ...pro,
    //     user: req.user._id,
    //   })
    // );
    // await Promise.all(data);
    await utapi.deleteFiles(id);
    return NextResponse.json({ data: null }, { status: 200 });
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
