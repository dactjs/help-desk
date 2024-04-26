import { Suspense } from "react";

import { ServerTicketWeeklyActivityChart } from "./server";
import { TicketWeeklyActivityChartSkeleton } from "./skeleton";

export function TicketWeeklyActivityChart() {
  return (
    <Suspense fallback={<TicketWeeklyActivityChartSkeleton />}>
      <ServerTicketWeeklyActivityChart />
    </Suspense>
  );
}
