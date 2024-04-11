import { Suspense } from "react";

import { ServerResourceTraceTimeline } from "./server";
import { ResourceTraceTimelineSkeleton } from "./skeleton";

export interface ResourceTraceTimelineProps {
  resourceId: string;
}

export function ResourceTraceTimeline({
  resourceId,
}: ResourceTraceTimelineProps): React.ReactElement {
  return (
    <Suspense fallback={<ResourceTraceTimelineSkeleton />}>
      <ServerResourceTraceTimeline resourceId={resourceId} />
    </Suspense>
  );
}
