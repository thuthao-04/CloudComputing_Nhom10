import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Các route cần bảo vệ
  const protectedRoutes = ["/users", "/products"];

  // Nếu truy cập route bảo vệ mà không có token → đá ra login
  if (protectedRoutes.some((path) => pathname.startsWith(path)) && !token) {
    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/users/:path*", "/products/:path*"],
};
