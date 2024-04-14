import "server-only";

import { SupportedLanguage } from "../../types";

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export async function getDictionary(language: SupportedLanguage) {
  const dictionaries = {
    en: () => import("./en.json").then((module) => module.default),
    es: () => import("./es.json").then((module) => module.default),
  };

  return dictionaries[language]();
}
