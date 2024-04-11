import { Suspense } from "react";

import { ServerResourceCard } from "./server";
import { ResourceCardSkeleton } from "./skeleton";

export interface ResourceCardProps {
  resourceId: string;
}

export function ResourceCard({
  resourceId,
}: ResourceCardProps): React.ReactElement {
  return (
    <Suspense fallback={<ResourceCardSkeleton />}>
      <ServerResourceCard resourceId={resourceId} />
    </Suspense>
  );
}
