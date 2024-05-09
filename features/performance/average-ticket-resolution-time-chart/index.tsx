import { Suspense } from "react";

import { ServerAverageTicketResolutionTimeChart } from "./server";
import { AverageTicketResolutionTimeChartSkeleton } from "./skeleton";

export interface AverageTicketResolutionTimeChartProps {
  start: Date;
  end: Date;
}

export function AverageTicketResolutionTimeChart({
  start,
  end,
}: AverageTicketResolutionTimeChartProps) {
  return (
    <Suspense fallback={<AverageTicketResolutionTimeChartSkeleton />}>
      <ServerAverageTicketResolutionTimeChart start={start} end={end} />
    </Suspense>
  );
}
