"use server";

import { subject } from "@casl/ability";
import { UserStatus, UserRole } from "@prisma/client";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/users";
import { getDictionary as getErrorsDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";
import { zod } from "@/lib/zod";

import { NECESSARY_USER_FIELDS } from "../constants";
import { User } from "../types";

export async function updateUser(data: unknown): Promise<User> {
  const language = getAppLanguage();

  const [session, errors] = await Promise.all([
    auth(),
    getErrorsDictionary(language),
  ]);

  const ability = createAbilityFor(session);

  try {
    const z = zod(language);

    const schema = z.object({
      id: z.string().uuid(),
      username: z.string(),
      email: z.string(),
      name: z.string(),
      status: z.nativeEnum(UserStatus),
      role: z.nativeEnum(UserRole),
    });

    const result = schema.safeParse(data);

    if (!result.success) {
      const {
        user_model: { id, username, email, name, status, role },
      } = await getDictionary(language);

      const fieldErrors = {
        [id]: result.error.flatten().fieldErrors.id,
        [username]: result.error.flatten().fieldErrors.username,
        [email]: result.error.flatten().fieldErrors.email,
        [name]: result.error.flatten().fieldErrors.name,
        [status]: result.error.flatten().fieldErrors.status,
        [role]: result.error.flatten().fieldErrors.role,
      };

      const message = Object.entries(fieldErrors)
        .filter(([, value]) => value)
        .reduce((acc, [key, value]) => `${acc}${key}: ${value}\n`, "");

      throw new Error(message);
    }

    const updated = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUniqueOrThrow({
        where: { id: result.data.id },
      });

      if (
        !ability.can("update", subject("User", user), "username") ||
        !ability.can("update", subject("User", user), "email") ||
        !ability.can("update", subject("User", user), "name") ||
        !ability.can("update", subject("User", user), "status") ||
        !ability.can("update", subject("User", user), "role")
      )
        throw new Error(errors.FORBIDDEN_ERROR);

      return await tx.user.update({
        where: { id: result.data.id },
        data: {
          username: result.data.username,
          email: result.data.email,
          name: result.data.name,
          status: result.data.status,
          role: result.data.role,
        },
        select: NECESSARY_USER_FIELDS,
      });
    });

    return updated;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    throw new Error(errors.UNEXPECTED_ERROR);
  }
}
