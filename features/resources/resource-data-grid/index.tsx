import { Suspense } from "react";

import { DataGridSkeleton } from "@/components/templates/data-grid-skeleton";

import { ServerResourceDataGrid } from "./server";

export const ResourceDataGrid: React.FC = () => (
  <Suspense fallback={<DataGridSkeleton />}>
    <ServerResourceDataGrid />
  </Suspense>
);
