import { Suspense } from "react";

import { ServerAverageTicketResolutionTimeChart } from "./server";
import { AverageTicketResolutionTimeChartSkeleton } from "./skeleton";

export function AverageTicketResolutionTimeChart() {
  return (
    <Suspense fallback={<AverageTicketResolutionTimeChartSkeleton />}>
      <ServerAverageTicketResolutionTimeChart />
    </Suspense>
  );
}
