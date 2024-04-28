"use client";

import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { debounce } from "@mui/material/utils";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useSnackbar } from "notistack";

import { Dictionary } from "@/internationalization/dictionaries/settings";

export interface ClientThemeSettingsProps {
  dictionary: Pick<Dictionary, "theme_settings">;
}

export function ClientThemeSettings({
  dictionary: {
    theme_settings: {
      heading,
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
    value: string
  ) => {
    try {
      window.localStorage.setItem("mode", value);
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
    (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        window.localStorage.setItem("primary_color", event.target.value);
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
    300
  );

  const handleOnSecondaryColorChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        window.localStorage.setItem("secondary_color", event.target.value);
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
    300
  );

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
            onChange={handleOnThemeChange}
          >
            <ToggleButton
              value="light"
              disabled={window.localStorage.getItem("mode") === "light"}
            >
              <LightModeIcon fontSize="small" />
            </ToggleButton>

            <ToggleButton
              value="dark"
              disabled={window.localStorage.getItem("mode") === "dark"}
            >
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
            onChange={handleOnPrimaryColorChange}
            sx={{ height: 36, padding: 0, border: "none" }}
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
            onChange={handleOnSecondaryColorChange}
            sx={{ height: 36, padding: 0, border: "none" }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
