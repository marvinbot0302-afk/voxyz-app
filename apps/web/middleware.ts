import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Deploy same codebase as 3 separate Vercel projects by setting APP_FLAVOR:
// - agentworld (default): no redirect
// - nfl: redirect / -> /nfl
// - poker: redirect / -> /poker
export function middleware(req: NextRequest) {
  const flavor = (process.env.APP_FLAVOR || '').toLowerCase();
  const { pathname } = req.nextUrl;

  if (pathname !== '/') return NextResponse.next();

  if (flavor === 'nfl') {
    return NextResponse.redirect(new URL('/nfl', req.url));
  }
  if (flavor === 'poker') {
    return NextResponse.redirect(new URL('/poker', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/']
};
