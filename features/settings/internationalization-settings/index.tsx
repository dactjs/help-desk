import { Suspense } from "react";

import { ServerInternationalizationSettings } from "./server";
import { InternationalizationSettingsSkeleton } from "./skeleton";

export function InternationalizationSettings() {
  return (
    <Suspense fallback={<InternationalizationSettingsSkeleton />}>
      <ServerInternationalizationSettings />
    </Suspense>
  );
}
