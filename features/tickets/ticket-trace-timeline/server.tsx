import { prisma } from "@/lib/prisma";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/tickets";

import { ClientTicketTraceTimeline } from "./client";
import { NECESSARY_TICKET_TRACE_FIELDS } from "./constants";

export interface ServerTicketTraceTimelineProps {
  ticketId: string;
}

export const ServerTicketTraceTimeline: React.FC<
  ServerTicketTraceTimelineProps
> = async ({ ticketId }) => {
  const language = getAppLanguage();

  // TODO: Fetch data from the server
  const [traces, dictionary] = await Promise.all([
    prisma.ticketTrace.findMany({
      where: { ticketId },
      select: NECESSARY_TICKET_TRACE_FIELDS,
    }),
    getDictionary(language),
  ]);

  return (
    <ClientTicketTraceTimeline
      traces={traces}
      language={language}
      dictionary={{
        ticket_trace_model: dictionary.ticket_trace_model,
        ticket_trace_timeline: dictionary.ticket_trace_timeline,
      }}
    />
  );
};
