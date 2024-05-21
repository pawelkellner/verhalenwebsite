// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isUserLoggedIn } from './app/actions';

export async function middleware(request: NextRequest) {
    // console.log('Executing middleware');
    // try {
    //     const isAuthenticated = await isUserLoggedIn();

    //     console.log('Is authenticated:', isAuthenticated);

    //     if (!isAuthenticated) {
    //         console.log('Redirecting to login page');
    //         return NextResponse.redirect(new URL('/admin', request.url));
    //     }

    //     console.log('Continuing to next handler');
    // } catch (error) {
    //     console.error('Error in authentication check:', error);
    // }

    // return NextResponse.next();
}

export const config = {
    matcher: '/admin/review/:path*',
};