import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { TOKEN } from "./helpers/cookie";

export async function middleware(request: NextRequest, response: NextResponse) {
  // if (request.nextUrl.pathname === "/") {
  //   return NextResponse.redirect(new URL("/trending-tools", request.url));
  // }
  const session = request.cookies.get(TOKEN);

  const isEmptyToken = session?.value && session.value === "undefined";

  if (isEmptyToken) {
    request.cookies.clear();
  }

  // const userDecode =
  //   session?.value && session.value !== "undefined"
  //     ? jwtDecode<JwtPayload>(session?.value ?? "")
  //     : "";

  // const userRole = (userDecode as any)?.role;

  // if (!session?.value) {
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }

  // Redirect to dashboard if user try access "/"
  // if (request.nextUrl.pathname === "/") {
  //   return NextResponse.redirect(new URL("/trending-tools", request.url));
  // }

  if (
    (request.nextUrl.pathname === "/submit-tool" ||
      request.nextUrl.pathname === "/profile") &&
    !session?.value
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    session?.value &&
    (request.nextUrl.pathname === "/sign-in" ||
      request.nextUrl.pathname === "/sign-up")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Check protected route by route
//   const checkProtectRoute =
//     dashboardNavigation.find((link) => link.href === request.nextUrl.pathname)
//       ?.roles ?? [];

//   if (
//     checkProtectRoute &&
//     checkProtectRoute?.length &&
//     checkProtectRoute?.some((role) => role !== userRole)
//   ) {
//     return NextResponse.redirect(new URL("/trending-tools", request.url));
//   }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("authorization", `Bearer ${session?.value}`);

  return NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });
}

//Add your protected routes
export const config = {
  matcher: [
    "/:path*",
    "/",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
