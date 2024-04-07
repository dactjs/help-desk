import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { prisma } from "@/lib/prisma";

import { UserSchema } from "../schemas/user";
import { NECESSARY_USER_FIELDS } from "../constants";
import { getDictionary } from "../dictionaries";

import { ClientUserDataGrid } from "./client";

export const ServerUserDataGrid: React.FC = async () => {
  const language = getAppLanguage();

  // TODO: add authorization and pagination
  const [users, dictionary] = await Promise.all([
    prisma.user.findMany({ select: NECESSARY_USER_FIELDS }),
    getDictionary(language),
  ]);

  const stripped = UserSchema(language).array().parse(users);

  return <ClientUserDataGrid users={stripped} dictionary={dictionary} />;
};
