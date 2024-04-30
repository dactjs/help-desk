import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/settings";

import { ClientThemeSettings } from "./client";

export async function ServerThemeSettings() {
  const language = getAppLanguage();

  const dictionary = await getDictionary(language);

  return (
    <ClientThemeSettings
      dictionary={{ theme_settings: dictionary.theme_settings }}
    />
  );
}
