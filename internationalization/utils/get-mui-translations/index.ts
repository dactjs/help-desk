import { enUS as coreEn, esES as coreEs } from "@mui/material/locale";
import {
  enUS as dataGridEn,
  esES as dataGridEs,
} from "@mui/x-data-grid/locales";
import {
  enUS as pickersEn,
  esES as pickersEs,
} from "@mui/x-date-pickers/locales";

import { SupportedLanguage } from "../../types";

export type MuiTranslations = ReturnType<typeof getMuiTranslations>;

export function getMuiTranslations(language: SupportedLanguage) {
  const translations = {
    en: [coreEn, dataGridEn, pickersEn],
    es: [coreEs, dataGridEs, pickersEs],
  };

  return translations[language];
}
