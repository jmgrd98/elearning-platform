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
    '/api/posts/delete',
    'api/posts/like'
  ],
  publicRoutes: [
    '/',
    '/api/stripe',
    '/api/webhook',
    '/api/clerk-webhook',
    "/api/webhooks(.*)",
    '/undefined',
    '/api/posts/create',
    '/api/posts/like/:id'
  ],
  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+\.[\w]+$)", "/undefined"]
});

export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next).*)",
    "/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"
  ]
};