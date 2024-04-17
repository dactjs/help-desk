import { Suspense } from "react";

import { TimelineSkeleton } from "@/components/templates/timeline-skeleton";

import { ServerTicketTraceTimeline } from "./server";

export interface TicketTraceTimelineProps {
  ticketId: string;
}

export function TicketTraceTimeline({ ticketId }: TicketTraceTimelineProps) {
  return (
    <Suspense fallback={<TimelineSkeleton />}>
      <ServerTicketTraceTimeline ticketId={ticketId} />
    </Suspense>
  );
}
