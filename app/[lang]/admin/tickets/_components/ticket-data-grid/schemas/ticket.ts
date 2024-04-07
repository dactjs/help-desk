import { TicketStatus } from "@prisma/client";
import { z } from "zod";

import { SupportedLanguage } from "@/internationalization/types/supported-language";
import { zod } from "@/lib/zod";

export type Ticket = z.infer<ReturnType<typeof TicketSchema>>;

export const TicketSchema = (lang: SupportedLanguage) => {
  const z = zod(lang);

  const schema = z.object({
    id: z.string().uuid(),
    status: z.nativeEnum(TicketStatus),
    service: ServiceSchema(lang),
    sentBy: UserSchema(lang),
    assignedTo: UserSchema(lang).nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });

  return schema;
};

const ServiceSchema = (lang: SupportedLanguage) => {
  const z = zod(lang);

  const schema = z.object({
    id: z.string().uuid(),
    name: z.string(),
  });

  return schema;
};

const UserSchema = (lang: SupportedLanguage) => {
  const z = zod(lang);

  const schema = z.object({
    id: z.string().uuid(),
    username: z.string(),
    email: z.string().email(),
    name: z.string(),
  });

  return schema;
};
