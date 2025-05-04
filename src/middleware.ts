import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const role = request.cookies.get("role")?.value;

  const currentPath = new URL(request.url).pathname;

  // Allow access to the sign-in page without redirecting
  if (currentPath === "/") {
    return NextResponse.next();
  }

  if (!token || !role) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const dashboardRoutes: Record<string, string> = {
    admin: "/dashboard",
    user: "/me",
  };

  const userDashboard = dashboardRoutes[role];

  // Redirect to sign-in if the user type is unknown
  if (!userDashboard) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow access if the user is already within their dashboard path
  if (currentPath.startsWith(userDashboard)) {
    return NextResponse.next();
  }

  // Redirect to the user's dashboard if they are outside it, that's beacuse they are signed in.
  return NextResponse.redirect(new URL(userDashboard, request.url));
}

export const config = {
  matcher: ["/me/:path*", "/dashboard/:path*"],
};
