import { auth } from "@/auth";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/settings";
import { prisma } from "@/lib/prisma";

import { ClientThemeSettings } from "./client";
import { ThemePreferencesSchema } from "./schemas";

export async function ServerThemeSettings() {
  const language = getAppLanguage();

  const [session, dictionary] = await Promise.all([
    auth(),
    getDictionary(language),
  ]);

  // TODO: add auth
  const user = await prisma.user.findUnique({
    where: { id: String(session?.user?.id) },
    select: { preferences: true },
  });

  const preferences = ThemePreferencesSchema.parse(
    user?.preferences?.theme ?? {}
  );

  return (
    <ClientThemeSettings
      preferences={preferences}
      dictionary={{ theme_settings: dictionary.theme_settings }}
    />
  );
}
