import { NextResponse, type NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/how-stanley-systems-works") {
    return new NextResponse("Not Found", {
      status: 404,
      headers: {
        "content-type": "text/plain; charset=utf-8",
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/how-stanley-systems-works"],
}
