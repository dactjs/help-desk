import { Suspense } from "react";

import { ServerTicketWeeklyActivityChart } from "./server";

export function TicketWeeklyActivityChart() {
  return (
    // TODO: add skeleton
    <Suspense fallback={null}>
      <ServerTicketWeeklyActivityChart />
    </Suspense>
  );
}
