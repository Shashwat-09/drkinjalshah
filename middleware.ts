import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    // Add security headers to all responses
    const response = NextResponse.next();
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    // Check if the path starts with /admin or /api/secure
    if (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/api/secure')) {
        // Skip check for login page itself
        if (request.nextUrl.pathname === '/admin/login') {
            return response;
        }

        const cookie = request.cookies.get('admin_session')?.value;
        const session = cookie ? await decrypt(cookie) : null;

        if (!session?.userId) {
            // Redirect to login page if no session
            if (request.nextUrl.pathname.startsWith('/api/secure')) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return response;
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
