import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { getLanguageFromHeaders } from "@/utils/get-language-from-headers";
import { SUPPORTED_LANGUAGES } from "@/config/languages";

export default auth((request) => {
  const { pathname } = request.nextUrl;

  const pathnameIncludeLang = SUPPORTED_LANGUAGES.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );

  if (pathnameIncludeLang) return;

  const language = getLanguageFromHeaders(request.headers);

  request.nextUrl.pathname = `/${language}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
