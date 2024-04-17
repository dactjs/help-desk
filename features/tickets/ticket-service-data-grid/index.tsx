import { Suspense } from "react";

import { DataGridSkeleton } from "@/components/templates/data-grid-skeleton";

import { ServerTicketServiceDataGrid } from "./server";

export function TicketServiceDataGrid() {
  return (
    <Suspense fallback={<DataGridSkeleton />}>
      <ServerTicketServiceDataGrid />
    </Suspense>
  );
}
