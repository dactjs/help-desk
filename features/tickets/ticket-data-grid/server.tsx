import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/tickets";
import { prisma } from "@/lib/prisma";

import { ClientTicketDataGrid } from "./client";
import { NECESSARY_TICKET_FIELDS } from "./constants";

export const ServerTicketDataGrid: React.FC = async () => {
  const language = getAppLanguage();

  // TODO: add authorization and pagination
  const [tickets, dictionary] = await Promise.all([
    prisma.ticket.findMany({
      orderBy: { createdAt: "desc" },
      select: NECESSARY_TICKET_FIELDS,
    }),
    getDictionary(language),
  ]);

  return (
    <ClientTicketDataGrid
      tickets={tickets}
      language={language}
      dictionary={{
        ticket_model: dictionary.ticket_model,
        ticket_data_grid: dictionary.ticket_data_grid,
      }}
    />
  );
};
