import { Suspense } from "react";

import { ServerAverageTicketFirstContactTimeChart } from "./server";
import { AverageTicketFirstContactTimeChartSkeleton } from "./skeleton";

export interface AverageTicketFirstContactTimeChartProps {
  start?: Date;
  end?: Date;
  technicianId?: string;
}

export function AverageTicketFirstContactTimeChart({
  start,
  end,
  technicianId,
}: AverageTicketFirstContactTimeChartProps) {
  return (
    <Suspense fallback={<AverageTicketFirstContactTimeChartSkeleton />}>
      <ServerAverageTicketFirstContactTimeChart
        start={start}
        end={end}
        technicianId={technicianId}
      />
    </Suspense>
  );
}
