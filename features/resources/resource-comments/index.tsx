import { Suspense } from "react";

import { ServerResourceComments } from "./server";

export interface ResourceCommentsProps {
  resourceId: string;
}

export function ResourceComments({ resourceId }: ResourceCommentsProps) {
  return (
    <Suspense fallback={null}>
      <ServerResourceComments resourceId={resourceId} />
    </Suspense>
  );
}
