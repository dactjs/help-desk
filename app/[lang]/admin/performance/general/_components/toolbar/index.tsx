import { Suspense } from "react";

import { ServerGeneralPerformanceToolbar } from "./server";
import { GeneralPerformanceToolbarSkeleton } from "./skeleton";

export function GeneralPerformanceToolbar() {
  return (
    <Suspense fallback={<GeneralPerformanceToolbarSkeleton />}>
      <ServerGeneralPerformanceToolbar />
    </Suspense>
  );
}
