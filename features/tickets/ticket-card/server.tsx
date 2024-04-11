import { prisma } from "@/lib/prisma";

import { NECESSARY_TICKET_FIELDS } from "./constants";

import { ClientTicketCard } from "./client";

export interface ServerTicketCardProps {
  ticketId: string;
}

export async function ServerTicketCard({
  ticketId,
}: ServerTicketCardProps): Promise<React.ReactElement> {
  // TODO: Fetch data from the server
  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
    select: NECESSARY_TICKET_FIELDS,
  });

  return <ClientTicketCard ticket={ticket} />;
}
