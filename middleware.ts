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
  ]
});

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};