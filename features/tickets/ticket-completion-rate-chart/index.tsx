import { Suspense } from "react";

import { ServerTicketCompletionRateChart } from "./server";

export function TicketCompletionRateChart() {
  return (
    // TODO: add skeleton
    <Suspense fallback={null}>
      <ServerTicketCompletionRateChart />
    </Suspense>
  );
}
