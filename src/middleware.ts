import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  const isLoginPage = pathname === "/signin";

  const isAdminRoute = pathname.startsWith("/admin");
  const isHospitalRoute = pathname.startsWith("/hospital");
  const isUserRoute = pathname.startsWith("/user");

  /* ================= LOGIN PAGE REDIRECT ================= */

  if (isLoginPage && token) {

    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    if (role === "hospital") {
      return NextResponse.redirect(new URL("/hospital/dashboard", request.url));
    }

    if (role === "user") {
      return NextResponse.redirect(new URL("/user/dashboard", request.url));
    }

  }

  /* ================= PROTECT ADMIN ================= */

  if (isAdminRoute) {

    if (!token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

  }

  /* ================= PROTECT HOSPITAL ================= */

  if (isHospitalRoute) {

    if (!token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    if (role !== "hospital") {
      return NextResponse.redirect(new URL("/", request.url));
    }

  }

  /* ================= PROTECT USER ================= */

  if (isUserRoute) {

    if (!token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    if (role !== "user") {
      return NextResponse.redirect(new URL("/", request.url));
    }

  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/signin",
    "/admin/:path*",
    "/hospital/:path*",
    "/user/:path*",
  ],
};