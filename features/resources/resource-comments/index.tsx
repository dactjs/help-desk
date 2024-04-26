import { Suspense } from "react";

import { CommentsSkeleton } from "@/components/templates/comments-skeleton";

import { ServerResourceComments } from "./server";

export interface ResourceCommentsProps {
  resourceId: string;
}

export function ResourceComments({ resourceId }: ResourceCommentsProps) {
  return (
    <Suspense fallback={<CommentsSkeleton />}>
      <ServerResourceComments resourceId={resourceId} />
    </Suspense>
  );
}
