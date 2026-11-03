import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    const loginUrl = new URL("/login", request.url);

    // যে পেজে যেতে চেয়েছিল, সেটি সংরক্ষণ করো
    loginUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname + request.nextUrl.search
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/studios/add-studio",
    "/my-listings",
    "/my-bookings",
    "/studios/edit/:path*",
  ],
};