// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isUserLoggedIn } from './app/actions';

export async function middleware(request: NextRequest) {
    // try {
    //     const isAuthenticated = await isUserLoggedIn();
    //     if (!isAuthenticated) {
    //         return NextResponse.redirect(new URL('/admin', request.url));
    //     }
    //
    // } catch (error) {
    //     console.error(error);
    // }
    //
    // return NextResponse.next();
}

export const config = {
    matcher: '/admin/review/:path*',
};