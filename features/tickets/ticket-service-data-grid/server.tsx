import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/tickets";
import { prisma } from "@/lib/prisma";

import { ClientTicketServiceDataGrid } from "./client";
import { NECESSARY_TICKET_SERVICE_FIELDS } from "./constants";

export const ServerTicketServiceDataGrid: React.FC = async () => {
  const language = getAppLanguage();

  // TODO: add authorization and pagination
  const [services, dictionary] = await Promise.all([
    prisma.ticketService.findMany({
      orderBy: { name: "desc" },
      select: NECESSARY_TICKET_SERVICE_FIELDS,
    }),
    getDictionary(language),
  ]);

  return (
    <ClientTicketServiceDataGrid
      services={services}
      dictionary={{
        ticket_service_model: dictionary.ticket_service_model,
        ticket_service_data_grid: dictionary.ticket_service_data_grid,
      }}
    />
  );
};
