import { Suspense } from "react";

import { ServerResourceComments } from "./server";

export interface ResourceCommentsProps {
  resourceId: string;
}

export function ResourceComments({ resourceId }: ResourceCommentsProps) {
  return (
    // TODO: add skeleton
    <Suspense fallback={null}>
      <ServerResourceComments resourceId={resourceId} />
    </Suspense>
  );
}
