import { Suspense } from "react";

import { ServerLogsToolbar } from "./server";

export function LogsToolbar() {
  // TODO: add skeleton
  return (
    <Suspense fallback={null}>
      <ServerLogsToolbar />
    </Suspense>
  );
}
