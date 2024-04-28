"use client";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { useSnackbar } from "notistack";

import { Dictionary } from "@/internationalization/dictionaries/settings";
import { SupportedLanguage } from "@/internationalization/types";

import { changeLanguage } from "./actions/change-language";

export interface ClientInternationalizationSettingsProps {
  language: SupportedLanguage;
  dictionary: Pick<Dictionary, "internationalization_settings">;
}

export function ClientInternationalizationSettings({
  language,
  dictionary: {
    internationalization_settings: { heading, language_field_label },
  },
}: ClientInternationalizationSettingsProps) {
  const { enqueueSnackbar } = useSnackbar();

  const handleOnChange = async (
    _: React.MouseEvent<HTMLElement, MouseEvent>,
    value: SupportedLanguage
  ) => {
    try {
      await changeLanguage(value);
    } catch (error) {
      if (error instanceof Error) {
        enqueueSnackbar(error.message, {
          variant: "error",
          style: { whiteSpace: "pre-line" },
        });
      }
    }
  };

  return (
    <Stack
      component={Paper}
      spacing={2}
      divider={<Divider flexItem />}
      sx={{ padding: 2 }}
    >
      <Typography component="h2" variant="subtitle1" fontWeight="bolder">
        {heading}
      </Typography>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Typography component="h3" variant="subtitle2" color="text.secondary">
          {language_field_label}
        </Typography>

        <ToggleButtonGroup
          exclusive
          size="small"
          value={language}
          onChange={handleOnChange}
        >
          <ToggleButton value="en" disabled={language === "en"}>
            EN
          </ToggleButton>

          <ToggleButton value="es" disabled={language === "es"}>
            ES
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
}
