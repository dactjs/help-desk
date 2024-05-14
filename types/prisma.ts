/* eslint-disable no-unused-vars */

import type { PaletteMode } from "@mui/material";

import { SupportedLanguage } from "@/internationalization/types";

declare global {
  namespace PrismaJson {
    type UserPreferences = Partial<{
      internationalization: {
        language?: SupportedLanguage;
      };
      theme: {
        mode?: PaletteMode;
        primaryColor?: string;
        secondaryColor?: string;
      };
    }>;
  }
}
