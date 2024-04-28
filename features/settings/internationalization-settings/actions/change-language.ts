"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/errors";
import {
  SUPPORTED_LANGUAGES,
  LANGUAGE_COOKIE_KEY,
} from "@/internationalization/config";
import { SupportedLanguage } from "@/internationalization/types";

export async function changeLanguage(
  language: SupportedLanguage
): Promise<void> {
  const errors = await getDictionary(getAppLanguage());

  try {
    if (!SUPPORTED_LANGUAGES.includes(language))
      throw new Error(errors.UNSUPPORTED_LANGUAGE);

    const { set } = cookies();

    set(LANGUAGE_COOKIE_KEY, language);

    redirect(`/${language}/admin/settings`);
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    throw new Error(errors.UNEXPECTED_ERROR);
  }
}
