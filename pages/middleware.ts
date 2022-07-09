import { NextRequest, NextResponse } from "next/server";

export function middleware(_request: NextRequest) {
  return NextResponse.redirect("/login");
}

export const config = {
  matcher: "/",
};
