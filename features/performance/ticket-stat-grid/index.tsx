import { Suspense } from "react";

import { ServerTicketStatGrid } from "./server";
import { TicketStatGridSkeleton } from "./skeleton";

export interface TicketStatGridProps {
  start?: Date;
  end?: Date;
}

export function TicketStatGrid({ start, end }: TicketStatGridProps) {
  return (
    <Suspense fallback={<TicketStatGridSkeleton />}>
      <ServerTicketStatGrid start={start} end={end} />
    </Suspense>
  );
}
