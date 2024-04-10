import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  apiRoutes: [
    '/api/doubts',
    '/api/doubts/create',
    '/api/doubts/edit',
    '/api/doubts/delete',
    '/api/posts',
    '/api/posts/create',
    '/api/posts/edit',
    '/api/posts/delete'
  ],
  publicRoutes: [
    '/',
    '/api/stripe',
    '/api/webhook',
    "/api/webhooks(.*)",
    '/undefined',
    '/api/posts/create'
  ],
  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/undefined"]
});

export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next).*)",
    "/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"
  ]
};