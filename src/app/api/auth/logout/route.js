import { logout } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { data, statusCode } = await logout(req);

    return NextResponse.json(
      {
        data,
      },
      { status: statusCode }
    );
  } catch (error) {
    return ErrorHandler(error, req);
  }
};
