import { z as zod } from "zod";

export const ParamsSchema = zod
  .object({
    start: zod
      .string()
      .datetime()
      .transform((value) => new Date(value)),

    end: zod
      .string()
      .datetime()
      .transform((value) => new Date(value)),
  })
  .partial()
  .refine(({ start, end }) => !start || !end || end > start, { path: ["end"] });
