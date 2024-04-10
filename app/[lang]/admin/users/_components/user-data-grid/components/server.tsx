import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { prisma } from "@/lib/prisma";

import { NECESSARY_USER_FIELDS } from "../constants";
import { getDictionary } from "../dictionaries";

import { ClientUserDataGrid } from "./client";

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

  return <ClientUserDataGrid users={users} dictionary={dictionary} />;
};
