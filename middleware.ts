import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-urban-language", request.nextUrl.pathname === "/kz" || request.nextUrl.pathname.startsWith("/kz/") ? "kk" : "ru");
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = { matcher: ["/", "/kz", "/privacy", "/kz/privacy"] };
