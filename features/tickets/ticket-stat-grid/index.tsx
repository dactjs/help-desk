import { Suspense } from "react";

import { ServerTicketStatGrid } from "./server";
import { TicketStatGridSkeleton } from "./skeleton";

export function TicketStatGrid() {
  return (
    <Suspense fallback={<TicketStatGridSkeleton />}>
      <ServerTicketStatGrid />
    </Suspense>
  );
}
