import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const authRoutes = ["/login", "/signup", "/forget", "/changePassword"];
  const protectedRoutes = ["/profile", "/logout"];
  const token = request.cookies.get("token")?.value || "";

  if (token && authRoutes.includes(path)) {
    const url = request.nextUrl.clone();
    url.pathname = "/profile";
    return NextResponse.redirect(url);
  }
  if (!token && protectedRoutes.includes(path)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
