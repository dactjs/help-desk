import { prisma } from "@/lib/prisma";

import { ClientTicketTraceTimeline } from "./client";

export interface ServerTicketTraceTimelineProps {
  ticketId: string;
}

export async function ServerTicketTraceTimeline({
  ticketId,
}: ServerTicketTraceTimelineProps): Promise<React.ReactElement> {
  // TODO: Fetch data from the server
  const traces = await prisma.ticketTrace.findMany({
    where: { ticketId },
  });

  return <ClientTicketTraceTimeline traces={traces} />;
}
