import { isAuth, restrictTo } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import {
  getAggregate,
  getAll,
} from "@/app/server/controller/factoryController";
import { connectDB } from "@/app/server/db/db";
import ContactUs from "@/app/server/models/contactUs.model";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectDB();
    await isAuth(req);
    await restrictTo(req, "admin");
    const searchParams = new URLSearchParams(req.nextUrl.searchParams);
    const filterValue = searchParams.get("name") || undefined;
    const page = searchParams.get("page") || 1;
    const limit = searchParams.get("limit") || 8;
    const sort = searchParams.get("sort") || "createdAt";

    if (filterValue) {
      const { data, pageCount, statusCode } = await getAggregate(
        req,
        ContactUs,
        {
          page,
          limit,
          sort,
          filterField: "user.name",
          filterValue,
          regexOptions: "i",
        }
      );
      //console.log("data", data);
      return NextResponse.json({ data, pageCount }, { status: statusCode });
    }
    const { data, statusCode, pageCount, allData } = await getAll(
      req,
      ContactUs,
      { path: "user" }
    );
    return NextResponse.json(
      { data, pageCount, allData },
      { status: statusCode }
    );
  } catch (error) {
    //console.log("ContactUss error", error);
    return ErrorHandler(error, req);
  }
};
