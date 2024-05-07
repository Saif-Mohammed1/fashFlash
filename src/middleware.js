import { NextResponse } from "next/server";

const middleware = async (req) => {
  // //console.log(" session?.user?.emailVerify", req);
  // if (
  //   session?.user &&
  //   req.nextUrl.pathname.startsWith("/auth") &&
  //   req.nextUrl.pathname !== "/auth/verify-email"
  // ) {
  //   //console.log('    req.nextUrl.pathname !== " /auth/verify-email" &&');

  //   return NextResponse.redirect(new URL("/", req.url));
  // }
  // if (
  //   req.nextUrl.pathname === "/auth/verify-email" &&
  //   session?.user?.emailVerify
  // ) {
  //   //console.log('    req.nextUrl.pathname === " /auth/verify-email" &&');
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  if (
    req.nextUrl.pathname === "/account/" ||
    req.nextUrl.pathname === "/account"
  ) {
    return NextResponse.redirect(new URL("/account/account-details", req.url));
  }
};

export default middleware;
// import { withAuth } from "next-auth/middleware";

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     console.log("nextAuth middleware triggered");
//     console.log("Token:", req.nextauth.token);
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token, //console.log("Token:", token),
//     },
//   }
// );

// export const config = { matcher: ["/admin", "/dashboard"] };
