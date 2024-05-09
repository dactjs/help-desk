import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/performance";

import { ClientGeneralPerformanceToolbar } from "./client";

export async function ServerGeneralPerformanceToolbar() {
  const language = getAppLanguage();

  const dictionary = await getDictionary(language);

  return (
    <ClientGeneralPerformanceToolbar
      dictionary={{
        general_performance_toolbar: dictionary.general_performance_toolbar,
      }}
    />
  );
}
