import { Suspense } from "react";

import { ServerAverageTicketFirstContactTimeChart } from "./server";
import { AverageTicketFirstContactTimeChartSkeleton } from "./skeleton";

export interface AverageTicketFirstContactTimeChartProps {
  start: Date;
  end: Date;
}

export function AverageTicketFirstContactTimeChart({
  start,
  end,
}: AverageTicketFirstContactTimeChartProps) {
  return (
    <Suspense fallback={<AverageTicketFirstContactTimeChartSkeleton />}>
      <ServerAverageTicketFirstContactTimeChart start={start} end={end} />
    </Suspense>
  );
}
