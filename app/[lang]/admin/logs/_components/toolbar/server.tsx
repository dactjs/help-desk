import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/logs";

import { ClientLogsToolbar } from "./client";

export async function ServerLogsToolbar() {
  const language = getAppLanguage();

  const dictionary = await getDictionary(language);

  return (
    <ClientLogsToolbar dictionary={{ logs_toolbar: dictionary.logs_toolbar }} />
  );
}
