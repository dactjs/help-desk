import { Suspense } from "react";

import { ServerAverageTicketFirstContactTimeChart } from "./server";
import { AverageTicketFirstContactTimeChartSkeleton } from "./skeleton";

export function AverageTicketFirstContactTimeChart() {
  return (
    <Suspense fallback={<AverageTicketFirstContactTimeChartSkeleton />}>
      <ServerAverageTicketFirstContactTimeChart />
    </Suspense>
  );
}
