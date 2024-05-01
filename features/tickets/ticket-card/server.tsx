import { subject } from "@casl/ability";
import { UserRole } from "@prisma/client";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/tickets";
import { prisma } from "@/lib/prisma";

import { ClientTicketCard } from "./client";
import { NECESSARY_TICKET_FIELDS } from "./constants";

export interface ServerTicketCardProps {
  ticketId: string;
}

export async function ServerTicketCard({ ticketId }: ServerTicketCardProps) {
  const language = getAppLanguage();

  const [session, ticket, dictionary] = await Promise.all([
    auth(),
    prisma.ticket.findUnique({
      where: { id: ticketId },
      select: NECESSARY_TICKET_FIELDS,
    }),
    getDictionary(language),
  ]);

  const ability = createAbilityFor(session);

  const data =
    ticket && ability.can("read", subject("Ticket", ticket)) ? ticket : null;

  const CONTEXT: Record<UserRole, string | null> = {
    [UserRole.ADMIN]: `/${language}/admin/tickets/${ticketId}`,
    [UserRole.TECHNICIAN]: `/${language}/technicians/tickets/${ticketId}`,
    [UserRole.USER]: `/${language}/dashboard/tickets/${ticketId}`,
  };

  const href = session?.user && data ? CONTEXT[session.user.role] : null;

  return (
    <ClientTicketCard
      ticket={data}
      href={href}
      language={language}
      dictionary={{
        ticket_model: dictionary.ticket_model,
        ticket_card: dictionary.ticket_card,
        not_found: dictionary.not_found,
      }}
    />
  );
}
