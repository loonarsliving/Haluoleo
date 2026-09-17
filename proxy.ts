import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  return NextResponse.rewrite(new URL('/__site-closed__', request.url));
}

export const config = {
  matcher: '/:path*',
};
