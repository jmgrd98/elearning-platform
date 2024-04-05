import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  apiRoutes: [
    '/api/doubt',
    '/api/doubt/new',
  ],
  publicRoutes: [
    "/api/doubt/new"
  ]
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};