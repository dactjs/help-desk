import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { prisma } from "@/lib/prisma";

import { ResourceSchema } from "../schemas/resource";
import { NECESSARY_RESOURCE_FIELDS } from "../constants";
import { getDictionary } from "../dictionaries";

import { ClientResourceDataGrid } from "./client";

export const ServerResourceDataGrid: React.FC = async () => {
  const language = getAppLanguage();

  // TODO: add authorization and pagination
  const [resources, dictionary] = await Promise.all([
    prisma.resource.findMany({ select: NECESSARY_RESOURCE_FIELDS }),
    getDictionary(language),
  ]);

  const stripped = ResourceSchema(language).array().parse(resources);

  return (
    <ClientResourceDataGrid resources={stripped} dictionary={dictionary} />
  );
};
