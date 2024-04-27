import { Suspense } from "react";

import { ServerThemeSettings } from "./server";

export function ThemeSettings() {
  // TODO: add skeleton
  return (
    <Suspense fallback={null}>
      <ServerThemeSettings />
    </Suspense>
  );
}
