"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { UserRole } from "@prisma/client";

import { auth } from "@/auth";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/errors";
import {
  SUPPORTED_LANGUAGES,
  LANGUAGE_COOKIE_KEY,
} from "@/internationalization/config";
import { prisma } from "@/lib/prisma";

import { InternationalizationPreferences } from "../schemas";

export async function changePreferences(
  preferences: Partial<InternationalizationPreferences>
): Promise<void> {
  const language = getAppLanguage();

  const [session, errors] = await Promise.all([
    auth(),
    getDictionary(language),
  ]);

  try {
    // TODO: add auth
    await prisma.$transaction(async (tx) => {
      if (preferences.language) {
        if (!SUPPORTED_LANGUAGES.includes(preferences.language))
          throw new Error(errors.UNSUPPORTED_LANGUAGE);

        const { set } = cookies();

        set(LANGUAGE_COOKIE_KEY, preferences.language);
      }

      const user = await tx.user.findUniqueOrThrow({
        where: { id: String(session?.user?.id) },
        select: { preferences: true },
      });

      await tx.user.update({
        where: { id: String(session?.user?.id) },
        data: {
          preferences: {
            internationalization: {
              ...user.preferences?.internationalization,
              ...preferences,
            },
            theme: user.preferences?.theme,
          },
        },
      });
    });
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    throw new Error(errors.UNEXPECTED_ERROR);
  }

  const CONTEXT: Record<UserRole, string> = {
    [UserRole.ADMIN]: `/${preferences.language}/admin/settings`,
    [UserRole.TECHNICIAN]: `/${preferences.language}/technicians/settings`,
    [UserRole.USER]: `/${preferences.language}/dashboard/settings`,
  };

  const url = session?.user
    ? CONTEXT[session.user.role]
    : `/${preferences.language}/auth/sign-in`;

  redirect(url);
}
