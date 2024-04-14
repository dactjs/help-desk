import { Suspense } from "react";

import { DataGridSkeleton } from "@/components/templates/data-grid-skeleton";

import { ServerUserDataGrid } from "./server";

export const UserDataGrid: React.FC = () => {
  return (
    <Suspense fallback={<DataGridSkeleton />}>
      <ServerUserDataGrid />
    </Suspense>
  );
};
