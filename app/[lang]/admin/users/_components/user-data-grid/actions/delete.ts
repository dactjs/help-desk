"use server";

import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getErrorsDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";

import { UserSchema, User } from "../schemas/user";
import { NECESSARY_USER_FIELDS } from "../constants";

// TODO: add authorization
export async function deleteUser(id: string): Promise<User> {
  const language = getAppLanguage();

  try {
    const deleted = await prisma.user.delete({
      where: { id },
      select: NECESSARY_USER_FIELDS,
    });

    const stripped = UserSchema(language).parse(deleted);

    return stripped;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    const errors = await getErrorsDictionary(language);

    throw new Error(errors.UNEXPECTED_ERROR);
  }
}
