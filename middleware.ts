import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  apiRoutes: [
    '/api/doubts',
    '/api/doubts/create',
    '/api/doubts/edit',
    '/api/doubts/delete',
  ],
  publicRoutes: [
    '/',
    '/api/doubts',
    "/api/doubts/create",
    '/api/doubts/edit',
    '/api/doubts/delete',
  ]
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};