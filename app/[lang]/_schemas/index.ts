import { z as zod } from "zod";

import { InternationalizationPreferencesSchema } from "@/features/settings/internationalization-settings/schemas";
import { ThemePreferencesSchema } from "@/features/settings/theme-settings/schemas";

export type UserPreferences = zod.infer<typeof UserPreferencesSchema>;

export const UserPreferencesSchema = zod.object({
  internationalization: InternationalizationPreferencesSchema,
  theme: ThemePreferencesSchema,
});
