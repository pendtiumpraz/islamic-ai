import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login");
    const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");
    const isAdmin = req.nextUrl.pathname.startsWith("/admin");

    // Redirect authenticated users away from login
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Protect dashboard routes
    if (isDashboard && !isAuth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Protect admin routes (add admin check later)
    if (isAdmin && !isAuth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // Let middleware handle auth logic
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/login",
  ],
};
