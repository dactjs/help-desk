import { Suspense } from "react";

import { ServerTicketComments } from "./server";

export interface TicketCommentsProps {
  ticketId: string;
}

export function TicketComments({ ticketId }: TicketCommentsProps) {
  return (
    <Suspense fallback={null}>
      <ServerTicketComments ticketId={ticketId} />
    </Suspense>
  );
}
