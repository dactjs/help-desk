import { TicketStatus } from "@prisma/client";
import { z as zod } from "zod";

const UserSchema = zod.object({
  id: zod.string().uuid(),
  username: zod.string(),
  email: zod.string(),
  name: zod.string(),
});

export const ParamsSchema = zod
  .object({
    search: zod.string(),

    status: zod
      .string()
      .transform((value) => JSON.parse(value) as TicketStatus[]),

    technicians: zod
      .string()
      .transform((raw) => UserSchema.array().parse(JSON.parse(raw))),

    page: zod.string().transform((value) => Number(value)),
    pageSize: zod.string().transform((value) => Number(value)),
  })
  .partial();
