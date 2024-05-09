import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/performance";

import { ClientIndividualPerformanceToolbar } from "./client";

export async function ServerIndividualPerformanceToolbar() {
  const language = getAppLanguage();

  const dictionary = await getDictionary(language);

  return (
    <ClientIndividualPerformanceToolbar
      dictionary={{
        individual_performance_toolbar:
          dictionary.individual_performance_toolbar,
      }}
    />
  );
}
