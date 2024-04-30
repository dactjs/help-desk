import { Suspense } from "react";

import { ServerTicketCompletionRateChart } from "./server";
import { TicketCompletionRateChartSkeleton } from "./skeleton";

export function TicketCompletionRateChart() {
  return (
    <Suspense fallback={<TicketCompletionRateChartSkeleton />}>
      <ServerTicketCompletionRateChart />
    </Suspense>
  );
}
