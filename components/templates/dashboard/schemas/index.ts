import { z as zod } from "zod";

export type LayoutPreferences = zod.infer<typeof LayoutPreferencesSchema>;

export const LayoutPreferencesSchema = zod
  .object({
    dashboard: zod
      .object({ expanded: zod.boolean().default(true) })
      .default({}),
  })
  .default({});
