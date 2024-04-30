import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/settings";

import { ClientInternationalizationSettings } from "./client";

export async function ServerInternationalizationSettings() {
  const language = getAppLanguage();

  const dictionary = await getDictionary(language);

  return (
    <ClientInternationalizationSettings
      language={language}
      dictionary={{
        internationalization_settings: dictionary.internationalization_settings,
      }}
    />
  );
}
