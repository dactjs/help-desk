import { accessibleBy } from "@casl/prisma";
import { UserRole } from "@prisma/client";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/tickets";
import { prisma } from "@/lib/prisma";

import { ClientTicketTraceTimeline } from "./client";
import { NECESSARY_TICKET_TRACE_FIELDS } from "./constants";

export interface ServerTicketTraceTimelineProps {
  ticketId: string;
}

export async function ServerTicketTraceTimeline({
  ticketId,
}: ServerTicketTraceTimelineProps) {
  const language = getAppLanguage();

  const session = await auth();

  const ability = createAbilityFor(session);

  const [traces, dictionary] = await Promise.all([
    prisma.ticketTrace.findMany({
      where: { AND: [accessibleBy(ability).TicketTrace, { ticketId }] },
      select: NECESSARY_TICKET_TRACE_FIELDS,
    }),
    getDictionary(language),
  ]);

  const CONTEXT: Record<UserRole, string | null> = {
    [UserRole.ADMIN]: `/${language}/admin`,
    [UserRole.TECHNICIAN]: `/${language}/technicians`,
    [UserRole.USER]: null,
  };

  return (
    <ClientTicketTraceTimeline
      traces={traces}
      context={session?.user ? CONTEXT[session.user.role] : null}
      language={language}
      dictionary={{
        ticket_trace_model: dictionary.ticket_trace_model,
        ticket_trace_timeline: dictionary.ticket_trace_timeline,
        ticket_trace_details_dialog: dictionary.ticket_trace_details_dialog,
      }}
    />
  );
}
