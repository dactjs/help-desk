import { Suspense } from "react";
import { ReadonlyURLSearchParams } from "next/navigation";

import { ServerTicketList } from "./server";
import { TicketListSkeleton } from "./skeleton";

export interface TicketListProps {
  searchParams: ReadonlyURLSearchParams;
}

export function TicketList({ searchParams }: TicketListProps) {
  return (
    <Suspense fallback={<TicketListSkeleton />}>
      <ServerTicketList searchParams={searchParams} />
    </Suspense>
  );
}
