import { auth, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// add below all the routes that need to be protectted

const isProtectedRoute = createRouteMatcher([
  
]);


export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};