import { auth } from "@/auth";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/settings";
import { prisma } from "@/lib/prisma";

import { ClientInternationalizationSettings } from "./client";
import { InternationalizationPreferencesSchema } from "./schemas";

export async function ServerInternationalizationSettings() {
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

  const preferences = InternationalizationPreferencesSchema.parse(
    user?.preferences?.internationalization ?? {}
  );

  return (
    <ClientInternationalizationSettings
      preferences={preferences}
      dictionary={{
        internationalization_settings: dictionary.internationalization_settings,
      }}
    />
  );
}
