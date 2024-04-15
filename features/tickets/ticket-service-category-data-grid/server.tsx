import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/tickets";
import { prisma } from "@/lib/prisma";

import { ClientTicketServiceCategoryDataGrid } from "./client";
import { NECESSARY_TICKET_SERVICE_CATEGORY_FIELDS } from "./constants";

export const ServerTicketServiceCategoryDataGrid: React.FC = async () => {
  const language = getAppLanguage();

  // TODO: add authorization and pagination
  const [categories, dictionary] = await Promise.all([
    prisma.ticketServiceCategory.findMany({
      orderBy: { name: "desc" },
      select: NECESSARY_TICKET_SERVICE_CATEGORY_FIELDS,
    }),
    getDictionary(language),
  ]);

  return (
    <ClientTicketServiceCategoryDataGrid
      categories={categories}
      dictionary={{
        ticket_service_category_model: dictionary.ticket_service_category_model,
        ticket_service_category_data_grid:
          dictionary.ticket_service_category_data_grid,
      }}
    />
  );
};
