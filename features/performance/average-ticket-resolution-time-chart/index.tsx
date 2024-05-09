import { Suspense } from "react";

import { ServerAverageTicketResolutionTimeChart } from "./server";
import { AverageTicketResolutionTimeChartSkeleton } from "./skeleton";

export interface AverageTicketResolutionTimeChartProps {
  start: Date;
  end: Date;
  technicianId?: string;
}

export function AverageTicketResolutionTimeChart({
  start,
  end,
  technicianId,
}: AverageTicketResolutionTimeChartProps) {
  return (
    <Suspense fallback={<AverageTicketResolutionTimeChartSkeleton />}>
      <ServerAverageTicketResolutionTimeChart
        start={start}
        end={end}
        technicianId={technicianId}
      />
    </Suspense>
  );
}
