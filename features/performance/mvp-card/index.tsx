import { Suspense } from "react";

import { ServerMVPCard } from "./server";
import { MVPCardSkeleton } from "./skeleton";

export interface MVPCardProps {
  start?: Date;
  end?: Date;
}

export function MVPCard({ start, end }: MVPCardProps) {
  return (
    <Suspense fallback={<MVPCardSkeleton />}>
      <ServerMVPCard start={start} end={end} />
    </Suspense>
  );
}
