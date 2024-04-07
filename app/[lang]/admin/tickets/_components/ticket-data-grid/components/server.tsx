import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { prisma } from "@/lib/prisma";

import { TicketSchema } from "../schemas/ticket";
import { NECESSARY_TICKET_FIELDS } from "../constants";
import { getDictionary } from "../dictionaries";

import { ClientTicketDataGrid } from "./client";

export const ServerTicketDataGrid: React.FC = async () => {
  const language = getAppLanguage();

  // TODO: add authorization and pagination
  const [tickets, dictionary] = await Promise.all([
    prisma.ticket.findMany({ select: NECESSARY_TICKET_FIELDS }),
    getDictionary(language),
  ]);

  const stripped = TicketSchema(language).array().parse(tickets);

  return <ClientTicketDataGrid tickets={stripped} dictionary={dictionary} />;
};
