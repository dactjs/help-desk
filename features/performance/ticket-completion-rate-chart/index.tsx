import { Suspense } from "react";

import { ServerTicketCompletionRateChart } from "./server";
import { TicketCompletionRateChartSkeleton } from "./skeleton";

export interface TicketCompletionRateChartProps {
  start?: Date;
  end?: Date;
}

export function TicketCompletionRateChart({
  start,
  end,
}: TicketCompletionRateChartProps) {
  return (
    <Suspense fallback={<TicketCompletionRateChartSkeleton />}>
      <ServerTicketCompletionRateChart start={start} end={end} />
    </Suspense>
  );
}
