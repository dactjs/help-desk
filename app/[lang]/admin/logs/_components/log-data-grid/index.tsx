import { Suspense } from "react";
import { ReadonlyURLSearchParams } from "next/navigation";

import { DataGridSkeleton } from "@/components/templates/data-grid-skeleton";

import { ServerLogDataGrid } from "./server";

export interface LogDataGridProps {
  searchParams: ReadonlyURLSearchParams;
}

export function LogDataGrid({ searchParams }: LogDataGridProps) {
  return (
    <Suspense fallback={<DataGridSkeleton />}>
      <ServerLogDataGrid searchParams={searchParams} />
    </Suspense>
  );
}
