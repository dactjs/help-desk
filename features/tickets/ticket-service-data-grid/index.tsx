import { Suspense } from "react";

import { DataGridSkeleton } from "@/components/templates/data-grid-skeleton";

import { ServerTicketServiceDataGrid } from "./server";

export const TicketServiceDataGrid: React.FC = () => (
  <Suspense fallback={<DataGridSkeleton />}>
    <ServerTicketServiceDataGrid />
  </Suspense>
);
