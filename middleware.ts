import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";

import { SUPPORTED_LANGUAGES, FALLBACK_LANGUAGE } from "@/config/languages";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameIncludeLang = SUPPORTED_LANGUAGES.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );

  if (pathnameIncludeLang) return;

  const languages = new Negotiator({
    headers: {
      "accept-language": request.headers.get("accept-language") ?? "*",
    },
  }).languages();

  const language = match(languages, SUPPORTED_LANGUAGES, FALLBACK_LANGUAGE);

  request.nextUrl.pathname = `/${language}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!_next).*)", // Skip all internal paths (_next)
  ],
};
