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
  .refine((data) => data.start && data.end && data.end > data.start, "end");
