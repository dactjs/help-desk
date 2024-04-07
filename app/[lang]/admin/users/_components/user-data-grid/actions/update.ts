"use server";

import { UserStatus, UserRole } from "@prisma/client";

import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getErrorsDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";
import { zod } from "@/lib/zod";

import { UserSchema, User } from "../schemas/user";
import { NECESSARY_USER_FIELDS } from "../constants";
import { getDictionary } from "../dictionaries";

// TODO: add authorization
export async function update(data: unknown): Promise<User> {
  const language = getAppLanguage();

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
      const { username, email, name, status, role } = await getDictionary(
        language
      );

      const errors = {
        [username]: result.error.flatten().fieldErrors.username,
        [email]: result.error.flatten().fieldErrors.email,
        [name]: result.error.flatten().fieldErrors.name,
        [status]: result.error.flatten().fieldErrors.status,
        [role]: result.error.flatten().fieldErrors.role,
      };

      const message = Object.entries(errors)
        .filter(([, value]) => value)
        .reduce((acc, [key, value]) => `${acc}${key}: ${value}\n`, "");

      throw new Error(message);
    }

    const updated = await prisma.user.update({
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

    const stripped = UserSchema(language).parse(updated);

    return stripped;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    const errors = await getErrorsDictionary(language);

    throw new Error(errors.UNEXPECTED_ERROR);
  }
}
