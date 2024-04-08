import "server-only";

import { headers, cookies } from "next/headers";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";

import { ENV } from "@/config/env";

import {
  SUPPORTED_LANGUAGES,
  LANGUAGE_COOKIE_KEY,
} from "../../config/languages";
import { SupportedLanguage } from "../../types/supported-language";

export function getAppLanguage(): SupportedLanguage {
  const cookie = cookies().get(LANGUAGE_COOKIE_KEY)?.value;

  if (cookie && SUPPORTED_LANGUAGES.includes(cookie as SupportedLanguage))
    return cookie as SupportedLanguage;

  const languages = new Negotiator({
    headers: Object.fromEntries(headers()),
  }).languages();

  const language = match(languages, SUPPORTED_LANGUAGES, ENV.FALLBACK_LANGUAGE);

  return language as SupportedLanguage;
}
