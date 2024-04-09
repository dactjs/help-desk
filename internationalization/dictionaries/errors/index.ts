import "server-only";

import { SupportedLanguage } from "../../types";

export async function getErrorsDictionary(language: SupportedLanguage) {
  const dictionaries = {
    en: () => import("./en.json").then((module) => module.default),
    es: () => import("./es.json").then((module) => module.default),
  };

  return dictionaries[language]();
}
