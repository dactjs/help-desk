import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";

import { SUPPORTED_LANGUAGES, FALLBACK_LANGUAGE } from "@/config/languages";
import { SupportedLanguage } from "@/types/supported-language";

export function getLanguageFromHeaders(headers: Headers): SupportedLanguage {
  const languages = new Negotiator({
    headers: { "accept-language": headers.get("accept-language") ?? "*" },
  }).languages();

  const language = match(languages, SUPPORTED_LANGUAGES, FALLBACK_LANGUAGE);

  return language as SupportedLanguage;
}
