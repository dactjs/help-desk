import { accessibleBy } from "@casl/prisma";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/users";
import { prisma } from "@/lib/prisma";

import { ClientUserDataGrid } from "./client";
import { NECESSARY_USER_FIELDS } from "./constants";

export async function ServerUserDataGrid() {
  const language = getAppLanguage();

  const session = await auth();

  const ability = createAbilityFor(session);

  // TODO: add pagination
  const [users, dictionary] = await Promise.all([
    prisma.user.findMany({
      where: accessibleBy(ability).User,
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
        user_action_dialog: dictionary.user_action_dialog,
      }}
    />
  );
}
