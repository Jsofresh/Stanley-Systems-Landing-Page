import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") return NextResponse.next()

  return NextResponse.redirect(new URL("/", "https://stanley-systems.com"), 307)
}

export const config = {
  matcher: ["/((?!api(?:/|$)|_next(?:/|$)|images(?:/|$)|brand-logos(?:/|$)|favicon\\.ico$|apple-icon\\.png$).*)"],
}
