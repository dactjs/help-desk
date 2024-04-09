import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { SUPPORTED_LANGUAGES } from "@/internationalization/config";

export default auth((request) => {
  const { pathname } = request.nextUrl;

  const pathnameIncludeLang = SUPPORTED_LANGUAGES.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );

  if (pathnameIncludeLang) return;

  const language = getAppLanguage();

  request.nextUrl.pathname = `/${language}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
