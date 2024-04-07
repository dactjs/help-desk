import { Suspense } from "react";

import { DataGridSkeleton } from "@/components/templates/data-grid-skeleton";

import { ServerResourceDataGrid } from "./components/server";

export const ResourceDataGrid: React.FC = () => {
  return (
    <Suspense fallback={<DataGridSkeleton />}>
      <ServerResourceDataGrid />
    </Suspense>
  );
};
