"use server";

import { signOut as signOutLib } from "@/auth";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/errors";

export async function signOut(): Promise<void> {
  const language = getAppLanguage();

  try {
    await signOutLib({
      redirect: true,
      redirectTo: `/${language}/auth/sign-in`,
    });
  } catch (error) {
    const errors = await getDictionary(language);

    if (error instanceof Error) throw new Error(error.message);

    throw new Error(errors.UNEXPECTED_ERROR);
  }
}
