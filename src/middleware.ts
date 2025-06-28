import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export default async function middleware(req: NextRequest) {
  console.log('Middleware triggered for path:', req.nextUrl.pathname);

  const publicRoutes = ['/login', '/register', '/'];

  if (publicRoutes.some(route => req.nextUrl.pathname === route)) {
    console.log('Public route accessed, allowing access to:', req.nextUrl.pathname);
    return NextResponse.next();
  }

  const token = req.cookies.get('auth-token')?.value;

  console.log('Token in cookies:', token ? 'Present' : 'Not present');
  console.log('Request path:', req.nextUrl.pathname);

  console.log('Private route detected, checking authentication...');
  if (!token) {
    console.log('No token found, redirecting to login');
    return NextResponse.redirect(new URL('/login', req.url));
  }
  console.log('Token found, proceeding with verification...');

  try {
    // Verify the JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    console.log('payload', payload);

    if (!payload) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    console.log('Token verified successfully');

    // Clone the request headers and add user info
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user', JSON.stringify(payload));

    // Create a new response with modified headers
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  } catch (error) {
    console.error('JWT verification failed:', error);
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.delete('auth-token');
    return response;
  }
}

// This matcher will run on all routes except static files and API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - API routes (they should handle their own auth)
     * - Static files in public folder (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/|_next/webpack-hmr|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)',
  ],
};
