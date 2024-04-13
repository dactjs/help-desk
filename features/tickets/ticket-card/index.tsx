import { Suspense } from "react";

import { CardSkeleton } from "@/components/templates/card-skeleton";

import { ServerTicketCard } from "./server";

export interface TicketCardProps {
  ticketId: string;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticketId }) => (
  <Suspense fallback={<CardSkeleton items={5} />}>
    <ServerTicketCard ticketId={ticketId} />
  </Suspense>
);
