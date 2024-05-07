import { isAuth, restrictTo } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import { getAll } from "@/app/server/controller/factoryController";
import { connectDB } from "@/app/server/db/db";
import Refund from "@/app/server/models/refund.model";
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
      const { data, pageCount, statusCode } = await getAggregate(req, Refund, {
        page,
        limit,
        sort,
        filterField: "user.name",
        filterValue,
        regexOptions: "i",
      });
      return NextResponse.json({ data, pageCount }, { status: statusCode });
    }
    const { data, statusCode, pageCount, allData } = await getAll(req, Refund);
    return NextResponse.json(
      { data, pageCount, allData },
      { status: statusCode }
    );
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
