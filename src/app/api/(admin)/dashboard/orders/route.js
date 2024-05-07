import { isAuth, restrictTo } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import {
  getAggregate,
  getAll,
} from "@/app/server/controller/factoryController";
import { connectDB } from "@/app/server/db/db";
import Address from "@/app/server/models/address.model";
import Order from "@/app/server/models/order.model ";
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
      const { data, pageCount, statusCode } = await getAggregate(req, Order, {
        page,
        limit,
        sort,
        filterField: "user.name",
        filterValue,
        regexOptions: "i",
      });
      return NextResponse.json({ data, pageCount }, { status: statusCode });
    }
    const { data, statusCode, pageCount, allData } = await getAll(req, Order);
    return NextResponse.json(
      { data, pageCount, allData },
      { status: statusCode }
    );
  } catch (error) {
    //console.log("error", error);
    return ErrorHandler(error, req);
  }
};
