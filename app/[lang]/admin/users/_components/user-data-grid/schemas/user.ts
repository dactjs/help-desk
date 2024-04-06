import { UserStatus, UserRole } from "@prisma/client";
import { z } from "zod";

import { SupportedLanguage } from "@/internationalization/types/supported-language";
import { zod } from "@/lib/zod";

export type User = z.infer<ReturnType<typeof UserSchema>>;

export const UserSchema = (lang: SupportedLanguage) => {
  const z = zod(lang);

  const schema = z.object({
    id: z.string().uuid(),
    username: z.string(),
    email: z.string().email(),
    name: z.string(),
    status: z.nativeEnum(UserStatus),
    role: z.nativeEnum(UserRole),
    createdAt: z.date(),
    updatedAt: z.date(),
  });

  return schema;
};
