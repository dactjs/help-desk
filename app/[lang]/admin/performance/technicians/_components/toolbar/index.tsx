import { Suspense } from "react";

import { ServerIndividualPerformanceToolbar } from "./server";
import { IndividualPerformanceToolbarSkeleton } from "./skeleton";

export function IndividualPerformanceToolbar() {
  return (
    <Suspense fallback={<IndividualPerformanceToolbarSkeleton />}>
      <ServerIndividualPerformanceToolbar />
    </Suspense>
  );
}
