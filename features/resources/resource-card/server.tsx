import { prisma } from "@/lib/prisma";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/resources";

import { ClientResourceCard } from "./client";
import { NECESSARY_RESOURCE_FIELDS } from "./constants";

export interface ServerResourceCardProps {
  resourceId: string;
}

export const ServerResourceCard: React.FC<ServerResourceCardProps> = async ({
  resourceId,
}) => {
  const language = getAppLanguage();

  // TODO: Fetch data from the server
  const [resource, dictionary] = await Promise.all([
    prisma.resource.findUnique({
      where: { id: resourceId },
      select: NECESSARY_RESOURCE_FIELDS,
    }),
    getDictionary(language),
  ]);

  return (
    <ClientResourceCard
      resource={resource}
      language={language}
      dictionary={{
        resource_model: dictionary.resource_model,
        resource_card: dictionary.resource_card,
        not_found: dictionary.not_found,
      }}
    />
  );
};
