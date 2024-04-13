import { prisma } from "@/lib/prisma";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/tickets";

import { ClientTicketCard } from "./client";
import { NECESSARY_TICKET_FIELDS } from "./constants";

export interface ServerTicketCardProps {
  ticketId: string;
}

export const ServerTicketCard: React.FC<ServerTicketCardProps> = async ({
  ticketId,
}) => {
  const language = getAppLanguage();

  // TODO: Fetch data from the server
  const [ticket, dictionary] = await Promise.all([
    prisma.ticket.findUnique({
      where: { id: ticketId },
      select: NECESSARY_TICKET_FIELDS,
    }),
    getDictionary(language),
  ]);

  return (
    <ClientTicketCard
      ticket={ticket}
      language={language}
      dictionary={{
        model: dictionary.model,
        ticket_card: dictionary.ticket_card,
        not_found: dictionary.not_found,
      }}
    />
  );
};
