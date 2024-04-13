import { Suspense } from "react";

import { TimelineSkeleton } from "@/components/templates/timeline-skeleton";

import { ServerResourceTraceTimeline } from "./server";

export interface ResourceTraceTimelineProps {
  resourceId: string;
}

export const ResourceTraceTimeline: React.FC<ResourceTraceTimelineProps> = ({
  resourceId,
}) => (
  <Suspense fallback={<TimelineSkeleton />}>
    <ServerResourceTraceTimeline resourceId={resourceId} />
  </Suspense>
);
