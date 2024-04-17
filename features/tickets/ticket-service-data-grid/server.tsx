import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/tickets";
import { prisma } from "@/lib/prisma";

import { ClientTicketServiceDataGrid } from "./client";
import {
  NECESSARY_TICKET_SERVICE_FIELDS,
  NECESSARY_TICKET_SERVICE_CATEGORY_FIELDS,
} from "./constants";

export async function ServerTicketServiceDataGrid() {
  const language = getAppLanguage();

  // TODO: add authorization and pagination
  const [services, categories, dictionary] = await Promise.all([
    prisma.ticketService.findMany({
      orderBy: { name: "desc" },
      select: NECESSARY_TICKET_SERVICE_FIELDS,
    }),
    prisma.ticketServiceCategory.findMany({
      orderBy: { name: "desc" },
      select: NECESSARY_TICKET_SERVICE_CATEGORY_FIELDS,
    }),
    getDictionary(language),
  ]);

  return (
    <ClientTicketServiceDataGrid
      services={services}
      categories={categories}
      dictionary={{
        ticket_service_model: dictionary.ticket_service_model,
        ticket_service_data_grid: dictionary.ticket_service_data_grid,
      }}
    />
  );
}
