import { Suspense } from "react";

import { DataGridSkeleton } from "@/components/templates/data-grid-skeleton";

import { ServerTicketDataGrid } from "./components/server";

export const TicketDataGrid: React.FC = () => {
  return (
    <Suspense fallback={<DataGridSkeleton />}>
      <ServerTicketDataGrid />
    </Suspense>
  );
};
