import { Suspense } from "react";

import { ServerThemeSettings } from "./server";
import { ThemeSettingsSkeleton } from "./skeleton";

export function ThemeSettings() {
  return (
    <Suspense fallback={<ThemeSettingsSkeleton />}>
      <ServerThemeSettings />
    </Suspense>
  );
}
