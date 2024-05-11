import { Suspense } from "react";

import { ServerTicketWeeklyActivityChart } from "./server";
import { TicketWeeklyActivityChartSkeleton } from "./skeleton";

export interface TicketWeeklyActivityChartProps {
  start?: Date;
  end?: Date;
}

export function TicketWeeklyActivityChart({
  start,
  end,
}: TicketWeeklyActivityChartProps) {
  return (
    <Suspense fallback={<TicketWeeklyActivityChartSkeleton />}>
      <ServerTicketWeeklyActivityChart start={start} end={end} />
    </Suspense>
  );
}
