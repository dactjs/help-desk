import { Suspense } from "react";

import { CommentsSkeleton } from "@/components/templates/comments-skeleton";

import { ServerTicketComments } from "./server";

export interface TicketCommentsProps {
  ticketId: string;
}

export function TicketComments({ ticketId }: TicketCommentsProps) {
  return (
    <Suspense fallback={<CommentsSkeleton />}>
      <ServerTicketComments ticketId={ticketId} />
    </Suspense>
  );
}
