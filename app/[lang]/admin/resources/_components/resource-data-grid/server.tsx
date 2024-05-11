import { accessibleBy } from "@casl/prisma";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/resources";
import { prisma } from "@/lib/prisma";

import { ClientResourceDataGrid } from "./client";
import { NECESSARY_RESOURCE_FIELDS } from "./constants";

export async function ServerResourceDataGrid() {
  const language = getAppLanguage();

  const session = await auth();

  const ability = createAbilityFor(session);

  // TODO: add pagination
  const [resources, dictionary] = await Promise.all([
    prisma.resource.findMany({
      where: accessibleBy(ability).Resource,
      orderBy: { createdAt: "desc" },
      select: NECESSARY_RESOURCE_FIELDS,
    }),
    getDictionary(language),
  ]);

  return (
    <ClientResourceDataGrid
      resources={resources}
      language={language}
      dictionary={{
        resource_model: dictionary.resource_model,
        resource_data_grid: dictionary.resource_data_grid,
        resource_action_dialog: dictionary.resource_action_dialog,
      }}
    />
  );
}
