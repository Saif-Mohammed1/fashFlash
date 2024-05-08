import { createRouteHandler } from "uploadthing/next";

import ourFileRouter from "./core";

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,

  // Apply an (optional) custom config:
  // config: { ... },
});

// export const GET = async (req) => {
//   console.log("GET createRouteHandler work");
//   //   await isAuth(req);
//   // restrictTo(req, "admin", "seller");
//   createRouteHandler({
//     router: ourFileRouter,

//     // Apply an (optional) custom config:
//     // config: { ... },
//   });
// };
// export const POST = async (req) => {
//   await isAuth(req);
//   restrictTo(req, "admin", "seller");
//   createRouteHandler({
//     router: ourFileRouter,

//     // Apply an (optional) custom config:
//     // config: { ... },
//   });
// };
