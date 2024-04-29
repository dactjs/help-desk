import { Suspense } from "react";

import { DataGridSkeleton } from "@/components/templates/data-grid-skeleton";

import { ServerResourceDataGrid } from "./server";

export function ResourceDataGrid() {
  return (
    <Suspense fallback={<DataGridSkeleton />}>
      <ServerResourceDataGrid />
    </Suspense>
  );
}
