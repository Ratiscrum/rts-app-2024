import { access } from 'fs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { access_token_cookie } from './lib/constants';

// Middleware to check if the user is authenticated and redirect to login if not authenticated to access specific routes
export async function middleware(request: NextRequest) {
  const token = request.cookies.get(access_token_cookie);

  if (!token) {
    return NextResponse.rewrite(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Needs to be a valid URL
export const config = {
  matcher: '/profile',
};
