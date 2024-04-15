import { Suspense } from "react";

import { DataGridSkeleton } from "@/components/templates/data-grid-skeleton";

import { ServerTicketServiceCategoryDataGrid } from "./server";

export const TicketServiceCategoryDataGrid: React.FC = () => (
  <Suspense fallback={<DataGridSkeleton />}>
    <ServerTicketServiceCategoryDataGrid />
  </Suspense>
);
