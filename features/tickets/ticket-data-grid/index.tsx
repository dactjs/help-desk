import { Suspense } from "react";

import { DataGridSkeleton } from "@/components/templates/data-grid-skeleton";

import { ServerTicketDataGrid } from "./server";

export const TicketDataGrid: React.FC = () => (
  <Suspense fallback={<DataGridSkeleton />}>
    <ServerTicketDataGrid />
  </Suspense>
);
