import { Suspense } from "react";

import { DataGridSkeleton } from "@/components/templates/data-grid-skeleton";

import { ServerLogDataGrid } from "./server";

export function LogDataGrid() {
  return (
    <Suspense fallback={<DataGridSkeleton />}>
      <ServerLogDataGrid />
    </Suspense>
  );
}
