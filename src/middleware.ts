import { JwtPayload, jwtDecode } from "jwt-decode";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { TOKEN } from "./helpers/cookie";
import "core-js/stable/atob";
import { dashboardNavigation } from "./navigation";

export async function middleware(request: NextRequest, response: NextResponse) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard/trending-tools", request.url));
  }
  
  if (request.nextUrl.pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard/trending-tools", request.url));
  }
}

//Add your protected routes
export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
