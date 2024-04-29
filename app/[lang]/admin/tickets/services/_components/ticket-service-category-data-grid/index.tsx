import { Suspense } from "react";

import { DataGridSkeleton } from "@/components/templates/data-grid-skeleton";

import { ServerTicketServiceCategoryDataGrid } from "./server";

export function TicketServiceCategoryDataGrid() {
  return (
    <Suspense fallback={<DataGridSkeleton />}>
      <ServerTicketServiceCategoryDataGrid />
    </Suspense>
  );
}
