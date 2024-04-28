import { Suspense } from "react";

import { ServerInternationalizationSettings } from "./server";

export function InternationalizationSettings() {
  // TODO: add skeleton
  return (
    <Suspense fallback={null}>
      <ServerInternationalizationSettings />
    </Suspense>
  );
}
