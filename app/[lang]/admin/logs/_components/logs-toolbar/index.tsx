import { Suspense } from "react";

import { ServerLogsToolbar } from "./server";
import { LogsToolbarSkeleton } from "./skeleton";

export function LogsToolbar() {
  return (
    <Suspense fallback={<LogsToolbarSkeleton />}>
      <ServerLogsToolbar />
    </Suspense>
  );
}
