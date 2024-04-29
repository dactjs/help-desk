import { Suspense } from "react";

import { DataGridSkeleton } from "@/components/templates/data-grid-skeleton";

import { ServerTicketDataGrid } from "./server";

export function TicketDataGrid() {
  return (
    <Suspense fallback={<DataGridSkeleton />}>
      <ServerTicketDataGrid />
    </Suspense>
  );
}
