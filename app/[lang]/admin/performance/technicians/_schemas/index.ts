import { z as zod } from "zod";

const UserSchema = zod.object({
  id: zod.string().uuid(),
  username: zod.string(),
  email: zod.string(),
  name: zod.string(),
});

export const ParamsSchema = zod
  .object({
    technician: zod
      .string()
      .transform((raw) => UserSchema.parse(JSON.parse(raw))),

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
