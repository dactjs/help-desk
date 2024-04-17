import { Suspense } from "react";

import { CardSkeleton } from "@/components/templates/card-skeleton";

import { ServerTicketCard } from "./server";

export interface TicketCardProps {
  ticketId: string;
}

export function TicketCard({ ticketId }: TicketCardProps) {
  return (
    <Suspense fallback={<CardSkeleton items={5} />}>
      <ServerTicketCard ticketId={ticketId} />
    </Suspense>
  );
}
