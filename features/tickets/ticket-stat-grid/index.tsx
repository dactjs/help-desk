import { Suspense } from "react";

import { ServerTicketStatGrid } from "./server";

export function TicketStatGrid() {
  return (
    // TODO: add skeleton
    <Suspense fallback={null}>
      <ServerTicketStatGrid />
    </Suspense>
  );
}
