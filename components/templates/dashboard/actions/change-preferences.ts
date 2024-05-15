"use server";

import { auth } from "@/auth";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/errors";
import { prisma } from "@/lib/prisma";

import { LayoutPreferences } from "../schemas";

export async function changePreferences(
  preferences: Partial<LayoutPreferences>
): Promise<void> {
  const language = getAppLanguage();

  const [session, errors] = await Promise.all([
    auth(),
    getDictionary(language),
  ]);

  try {
    // TODO: add auth
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUniqueOrThrow({
        where: { id: String(session?.user?.id) },
        select: { preferences: true },
      });

      const clone = structuredClone(user.preferences ?? {});

      clone.layout = {
        ...clone.layout,
        ...preferences,
      };

      await tx.user.update({
        where: { id: String(session?.user?.id) },
        data: { preferences: clone },
      });
    });
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    throw new Error(errors.UNEXPECTED_ERROR);
  }
}
