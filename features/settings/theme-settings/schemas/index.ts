import { z as zod } from "zod";

import { DEFAULT_THEME } from "@/config/theme";

export type ThemePreferences = zod.infer<typeof ThemePreferencesSchema>;

export const ThemePreferencesSchema = zod
  .object({
    mode: zod.enum(["light", "dark"]).default(DEFAULT_THEME.MODE),
    primaryColor: zod.string().default(DEFAULT_THEME.PRIMARY_COLOR),
    secondaryColor: zod.string().default(DEFAULT_THEME.SECONDARY_COLOR),
  })
  .default({});
