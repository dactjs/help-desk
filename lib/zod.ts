import i18next from "i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import en from "zod-i18n-map/locales/en/zod.json";
import es from "zod-i18n-map/locales/es/zod.json";

import { FALLBACK_LANGUAGE } from "@/config/languages";
import { SupportedLanguage } from "@/types/supported-language";

i18next.init({
  lng: FALLBACK_LANGUAGE,
  resources: {
    en: { zod: en },
    es: { zod: es },
  },
});

export function zod(lang: SupportedLanguage = FALLBACK_LANGUAGE) {
  i18next.changeLanguage(lang);

  z.setErrorMap(zodI18nMap);

  return z;
}
