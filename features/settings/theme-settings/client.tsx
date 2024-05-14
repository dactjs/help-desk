"use client";

import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { debounce } from "@mui/material/utils";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ResetIcon from "@mui/icons-material/RestartAlt";
import { useSnackbar } from "notistack";

import { Dictionary } from "@/internationalization/dictionaries/settings";
import { DEFAULT_THEME } from "@/config/theme";

import { changePreferences } from "./actions/change-preferences";
import { ThemePreferences } from "./schemas";

export interface ClientThemeSettingsProps {
  preferences: ThemePreferences;
  dictionary: Pick<Dictionary, "theme_settings">;
}

export function ClientThemeSettings({
  preferences,
  dictionary: {
    theme_settings: {
      heading,
      reset_button_text,
      theme_field_label,
      primary_color_field_label,
      secondary_color_field_label,
    },
  },
}: ClientThemeSettingsProps) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const handleOnThemeChange = async (
    _: React.MouseEvent<HTMLElement, MouseEvent>,
    value: "light" | "dark"
  ) => {
    try {
      await changePreferences({ mode: value });
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        enqueueSnackbar(error.message, {
          variant: "error",
          style: { whiteSpace: "pre-line" },
        });
      }
    }
  };

  const handleOnPrimaryColorChange = debounce(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        await changePreferences({ primaryColor: event.target.value });
        router.refresh();
      } catch (error) {
        if (error instanceof Error) {
          enqueueSnackbar(error.message, {
            variant: "error",
            style: { whiteSpace: "pre-line" },
          });
        }
      }
    },
    400
  );

  const handleOnSecondaryColorChange = debounce(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        await changePreferences({ secondaryColor: event.target.value });
        router.refresh();
      } catch (error) {
        if (error instanceof Error) {
          enqueueSnackbar(error.message, {
            variant: "error",
            style: { whiteSpace: "pre-line" },
          });
        }
      }
    },
    400
  );

  const handleReset = async () => {
    try {
      await changePreferences({
        mode: DEFAULT_THEME.MODE,
        primaryColor: DEFAULT_THEME.PRIMARY_COLOR,
        secondaryColor: DEFAULT_THEME.SECONDARY_COLOR,
      });
      router.refresh();
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
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Typography component="h2" variant="subtitle1" fontWeight="bolder">
          {heading}
        </Typography>

        <Button
          variant="outlined"
          size="small"
          color="inherit"
          endIcon={<ResetIcon />}
          onClick={handleReset}
        >
          {reset_button_text}
        </Button>
      </Stack>

      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography component="h3" variant="subtitle2" color="text.secondary">
            {theme_field_label}
          </Typography>

          <ToggleButtonGroup
            exclusive
            size="small"
            value={preferences.mode}
            onChange={handleOnThemeChange}
          >
            <ToggleButton value="light" disabled={preferences.mode === "light"}>
              <LightModeIcon fontSize="small" />
            </ToggleButton>

            <ToggleButton value="dark" disabled={preferences.mode === "dark"}>
              <DarkModeIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography component="h3" variant="subtitle2" color="text.secondary">
            {primary_color_field_label}
          </Typography>

          <Box
            component="input"
            type="color"
            defaultValue={preferences.primaryColor}
            onChange={handleOnPrimaryColorChange}
            sx={{
              width: 35,
              height: 40,
              padding: 0,
              border: "none",
              backgroundColor: "transparent",
              appearance: "none",
              cursor: "pointer",
              "::-webkit-color-swatch": { borderRadius: 2.5 },
            }}
          />
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography component="h3" variant="subtitle2" color="text.secondary">
            {secondary_color_field_label}
          </Typography>

          <Box
            component="input"
            type="color"
            defaultValue={preferences.secondaryColor}
            onChange={handleOnSecondaryColorChange}
            sx={{
              width: 35,
              height: 40,
              padding: 0,
              border: "none",
              backgroundColor: "transparent",
              appearance: "none",
              cursor: "pointer",
              "::-webkit-color-swatch": { borderRadius: 2.5 },
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
