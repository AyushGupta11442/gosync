import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// Define routes that need protection
const isProtectedRoute = createRouteMatcher([
  '/protected-route1',
  '/protected-route2',
  '/api/*', // Example: protect all API routes
]);

export default clerkMiddleware(async (auth, req) => {
  // Check if the route is protected
  if (isProtectedRoute(req)) {
    auth().protect();
  }

  // Handle custom logic for URL rewriting and redirection
  const { nextUrl: url } = req;
  const searchParams = url.searchParams.toString();
  const hostname = req.headers.get('host');
  const pathWithSearchParams = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;

  // Check for subdomain and rewrite if needed
  const customSubDomain = hostname
    ?.split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
    .filter(Boolean)[0];

  if (customSubDomain) {
    return NextResponse.rewrite(
      new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
    );
  }

  // Redirect sign-in and sign-up routes
  if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
    return NextResponse.redirect(new URL(`/agency/sign-in`, req.url));
  }

  // Rewrite root path or /site if on the main domain
  if (
    url.pathname === '/' ||
    (url.pathname === '/site' && hostname === process.env.NEXT_PUBLIC_DOMAIN)
  ) {
    return NextResponse.rewrite(new URL('/site', req.url));
  }

  // Rewrite agency or subaccount paths
  if (
    url.pathname.startsWith('/agency') ||
    url.pathname.startsWith('/subaccount')
  ) {
    return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url));
  }

  // Allow other routes to pass through
  return NextResponse.next();
});

export const config = {
  // Matcher configuration to run middleware on all routes except static assets
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
