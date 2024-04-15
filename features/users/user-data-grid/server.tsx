import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/users";
import { prisma } from "@/lib/prisma";

import { ClientUserDataGrid } from "./client";
import { NECESSARY_USER_FIELDS } from "./constants";

export const ServerUserDataGrid: React.FC = async () => {
  const language = getAppLanguage();

  // TODO: add authorization and pagination
  const [users, dictionary] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: NECESSARY_USER_FIELDS,
    }),
    getDictionary(language),
  ]);

  return (
    <ClientUserDataGrid
      users={users}
      language={language}
      dictionary={{
        user_model: dictionary.user_model,
        user_data_grid: dictionary.user_data_grid,
      }}
    />
  );
};