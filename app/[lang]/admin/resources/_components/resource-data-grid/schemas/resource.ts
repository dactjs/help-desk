import { z } from "zod";

import { SupportedLanguage } from "@/internationalization/types/supported-language";
import { zod } from "@/lib/zod";

export type Resource = z.infer<ReturnType<typeof ResourceSchema>>;

export const ResourceSchema = (lang: SupportedLanguage) => {
  const z = zod(lang);

  const schema = z.object({
    id: z.string().uuid(),
    brand: z.string(),
    model: z.string(),
    serial: z.string(),
    assignedTo: UserSchema(lang).nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
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
