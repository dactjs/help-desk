"use client";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Dictionary } from "@/internationalization/dictionaries/settings";

export interface ClientThemeSettingsProps {
  dictionary: Pick<Dictionary, "theme_settings">;
}

export function ClientThemeSettings({
  dictionary: {
    theme_settings: { heading },
  },
}: ClientThemeSettingsProps) {
  return (
    <Paper sx={{ padding: 2 }}>
      <Typography component="h2" variant="subtitle1" fontWeight="bolder">
        {heading}
      </Typography>

      <Stack></Stack>
    </Paper>
  );
}
