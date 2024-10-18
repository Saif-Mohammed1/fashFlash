import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

import { NextResponse } from "next/server";
const protectedRoutes = ["/account", "/cart", "/checkout", "/favorite"];
const middleware = async (req) => {
  const pathname = req.nextUrl.pathname;
  const isAuth = await getToken({ req });
  const isAdmin = isAuth && isAuth?.role === "admin";
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  ); // //console.log(" session?.user?.emailVerify", req);
  console.log("pathname middleware", pathname);
  console.log("isAuth middleware", isAuth);
  if (
    isAuth &&
    pathname.startsWith("/auth") &&
    pathname !== "/auth/verify-email"
  ) {
    //console.log('    req.nextUrl.pathname !== " /auth/verify-email" &&');

    return NextResponse.redirect(new URL("/", req.url));
  }
  if (pathname === "/auth/verify-email" && isAuth?.emailVerify) {
    //console.log('    req.nextUrl.pathname === " /auth/verify-email" &&');
    return NextResponse.redirect(new URL("/", req.url));
    // }
  }
  if (isAuth && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (isProtectedRoute && !isAuth) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
  if (isAuth && pathname === "/account") {
    return NextResponse.rewrite(new URL("/account/account-details", req.url));
  }
  if (!isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.rewrite(new URL("/not-found", req.url));
  }
  if (isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }
  return NextResponse.next();
};

export default withAuth(middleware, {
  callbacks: {
    async authorized({ token, req }) {
      const { pathname } = req.nextUrl;
      console.log("pathname", pathname);
      console.log("token", token);
      const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
      );
      /**  
       * Only protect the /account route, all other routes are public
       * 
          ***** both are same 
      * if (pathname.startsWith("/account")) {
        return !!token;
            }
      * or return pathname.startsWith("/account") ? !!token : true;
 */
      if (isProtectedRoute) {
        return !!token;
      }
      return true;
      // Only protect the defined routes
      // return isProtectedRoute ? !!token : true;
    },
  },

  pages: {},
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    // "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
