import { z as zod } from "zod";

import { ENV } from "@/config/env";

export type InternationalizationPreferences = zod.infer<
  typeof InternationalizationPreferencesSchema
>;

export const InternationalizationPreferencesSchema = zod
  .object({ language: zod.enum(["en", "es"]).default(ENV.FALLBACK_LANGUAGE) })
  .default({});
