"use server";

import { revalidatePath } from "next/cache";

import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getErrorsDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";

// TODO: add authorization
export async function deleteUser(id: string): Promise<void> {
  const language = getAppLanguage();

  try {
    await prisma.user.delete({ where: { id } });

    revalidatePath("/[lang]/admin/users");
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    const errors = await getErrorsDictionary(language);

    throw new Error(errors.UNEXPECTED_ERROR);
  }
}
