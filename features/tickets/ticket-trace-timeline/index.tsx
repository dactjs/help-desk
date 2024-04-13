import { Suspense } from "react";

import { TimelineSkeleton } from "@/components/templates/timeline-skeleton";

import { ServerTicketTraceTimeline } from "./server";

export interface TicketTraceTimelineProps {
  ticketId: string;
}

export const TicketTraceTimeline: React.FC<TicketTraceTimelineProps> = ({
  ticketId,
}) => (
  <Suspense fallback={<TimelineSkeleton />}>
    <ServerTicketTraceTimeline ticketId={ticketId} />
  </Suspense>
);
