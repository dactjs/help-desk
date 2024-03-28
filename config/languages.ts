import { ENV } from "@/config/env";
import { SupportedLanguage } from "@/types/supported-language";

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ["en", "es"];

export const FALLBACK_LANGUAGE: SupportedLanguage =
  SUPPORTED_LANGUAGES.includes(ENV.FALLBACK_LANGUAGE)
    ? ENV.FALLBACK_LANGUAGE
    : "en";
