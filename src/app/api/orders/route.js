import { isAuth } from "@/app/server/controller/authController";
import ErrorHandler from "@/app/server/controller/errorController";
import { getDataByUser } from "@/app/server/controller/factoryController";
import { connectDB } from "@/app/server/db/db";
import Order from "@/app/server/models/order.model ";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectDB();
    await isAuth(req);

    const { data, statusCode } = await getDataByUser(req, Order);

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
// export const POST = async (req) => {
//   try {
//     await connectDB();
//     //   .then((re) => //console.log("success connect to db"))
//     //   .catch((re) => //console.log("failed connect to db"));
//     //console.log("called ORDER");
//     const { message, statusCode } = await createUserOrder(req, Order);

//     return NextResponse.json(
//       {
//         message,
//       },
//       { status: statusCode }
//     );
//   } catch (error) {
//     return ErrorHandler(error, req);
//   }
// };
