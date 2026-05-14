import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Define route protection patterns
  const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');
  const isAuthRoute = pathname.startsWith('/profile') || pathname.startsWith('/checkout');
  const isPublicAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');

  // 2. Verify token if present
  const payload = token ? verifyToken(token) : null;

  // 3. Handle Admin routes
  if (isAdminRoute) {
    if (!payload || payload.role !== 'ADMIN') {
      // If it's an API route, return 403, otherwise redirect to login
      if (pathname.startsWith('/api')) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 4. Handle Authenticated routes
  if (isAuthRoute) {
    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 5. Redirect logged-in users away from login/register pages
  if (isPublicAuthPage && payload) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/profile/:path*',
    '/checkout/:path*',
    '/login',
    '/register',
  ],
};
