import { Suspense } from "react";

import { DataGridSkeleton } from "@/components/templates/data-grid-skeleton";

import { ServerUserDataGrid } from "./server";

export function UserDataGrid() {
  return (
    <Suspense fallback={<DataGridSkeleton />}>
      <ServerUserDataGrid />
    </Suspense>
  );
}
