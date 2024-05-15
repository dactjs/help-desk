/* eslint-disable no-unused-vars */

import type { PaletteMode } from "@mui/material";
import { Prisma } from "@prisma/client";

import { SupportedLanguage } from "@/internationalization/types";

declare global {
  namespace PrismaJson {
    type LogMetadata = Prisma.JsonObject;

    type UserPreferences = Partial<{
      internationalization: {
        language?: SupportedLanguage;
      };
      theme: {
        mode?: PaletteMode;
        primaryColor?: string;
        secondaryColor?: string;
      };
      layout: {
        dashboard?: {
          expanded?: boolean;
        };
      };
    }>;
  }
}
