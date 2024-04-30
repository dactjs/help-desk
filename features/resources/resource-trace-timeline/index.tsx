import { Suspense } from "react";

import { TimelineSkeleton } from "@/components/templates/timeline-skeleton";

import { ServerResourceTraceTimeline } from "./server";

export interface ResourceTraceTimelineProps {
  resourceId: string;
}

export function ResourceTraceTimeline({
  resourceId,
}: ResourceTraceTimelineProps) {
  return (
    <Suspense fallback={<TimelineSkeleton />}>
      <ServerResourceTraceTimeline resourceId={resourceId} />
    </Suspense>
  );
}
