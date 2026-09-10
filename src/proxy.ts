import { NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
} from "@/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  if (firstSegment === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    const response = NextResponse.redirect(url);
    response.cookies.set(localeCookieName, defaultLocale, { path: "/" });
    return response;
  }

  if (isLocale(firstSegment)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", firstSegment);
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    response.cookies.set(localeCookieName, firstSegment, { path: "/" });
    response.headers.set("x-locale", firstSegment);
    return response;
  }

  const cookieLocale = request.cookies.get(localeCookieName)?.value;
  if (cookieLocale === "ar") {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/ar" : `/ar${pathname}`;
    return NextResponse.redirect(url);
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", defaultLocale);
  const response = NextResponse.rewrite(url, {
    request: { headers: requestHeaders },
  });
  response.headers.set("x-locale", defaultLocale);
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|_next/webpack-hmr|favicon.ico|.*\\..*).*)",
  ],
};
