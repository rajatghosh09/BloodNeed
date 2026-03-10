// // // import { clerkMiddleware } from '@clerk/nextjs/server'

// // // export default clerkMiddleware({
// // //     publicRoutes:["/"]
// // // })

// // // export const config = {
// // //   matcher: [
// // //     // Skip Next.js internals and all static files, unless found in search params
// // //     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
// // //     // Always run for API routes
// // //     '/(api|trpc)(.*)',
// // //   ],
// // // }


// // import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";



// // export const config = {
// //   matcher: [
// //     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
// //     "/(api|trpc)(.*)",
// //   ],
// // };


// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//     const { pathname } = request.nextUrl;
//     const token = request.cookies.get("token")?.value;
//     const role = request.cookies.get("role")?.value;
//     console.log("path", pathname);
//     console.log("token from midleware", token);
//     console.log("role from midleware", role);

//     const isLoginPage = pathname === "/signin";
//     const isAdminPage = pathname.startsWith("/admin");

//     if (isLoginPage && token) {
//         if (role === "admin") {
//             return NextResponse.redirect(new URL("/admin/dashboard", request.url));
//         }
//         return NextResponse.redirect(new URL("/", request.url));
//     }

//     // // if (isAdminPage) {
//     // //     if (!token) {
//     // //         return NextResponse.redirect(new URL("/login", request.url));
//     // //     }
//     // //     return NextResponse.next();
//     // // }

//     // // return NextResponse.next();
//     if (isAdminPage) {
//         if (!token) {
//             return NextResponse.redirect(new URL("/signin", request.url));
//       }
      
    
//         if (role !== "admin") {
//             return NextResponse.redirect(new URL("/", request.url));
//         }
//     }

//     return NextResponse.next();
// }

// // See "Matching Paths" below to learn more
// export const config = {
//     matcher: ["/signin", "/admin/:path*"],
// };


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