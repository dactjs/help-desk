"use client";

import { Roboto } from "next/font/google";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { SnackbarProvider } from "notistack";
import { ConfirmProvider } from "material-ui-confirm";
import { Session } from "next-auth";

import { AbilityContext } from "@/auth/ability";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { getMuiTranslations } from "@/internationalization/utils/get-mui-translations";
import { Dictionary } from "@/internationalization/dictionaries/common";
import { SupportedLanguage } from "@/internationalization/types";

import { UserPreferences } from "../../_schemas";

const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export interface ProvidersProps {
  session: Session | null;
  language: SupportedLanguage;
  preferences: UserPreferences;
  dictionary: Pick<Dictionary, "confirm_dialog">;
  children: React.ReactNode;
}

export function Providers({
  session,
  language,
  preferences,
  dictionary: { confirm_dialog },
  children,
}: ProvidersProps) {
  const ability = createAbilityFor(session);

  const translations = getMuiTranslations(language);

  const theme = createTheme(
    {
      palette: {
        mode: preferences.theme.mode,
        primary: { main: preferences.theme.primaryColor },
        secondary: { main: preferences.theme.secondaryColor },
      },
      typography: { fontFamily: roboto.style.fontFamily },
    },
    ...translations
  );

  return (
    <AbilityContext.Provider value={ability}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SnackbarProvider>
            <ConfirmProvider
              defaultOptions={{
                title: confirm_dialog.title,
                description: confirm_dialog.description,
                confirmationButtonProps: {
                  variant: "contained",
                  color: "warning",
                },
                cancellationButtonProps: {
                  variant: "outlined",
                  color: "inherit",
                },
              }}
            >
              <CssBaseline />

              <GlobalStyles
                styles={{
                  "*": {
                    scrollbarWidth: "thin",
                    scrollbarColor: `${preferences.theme.secondaryColor} transparent`,
                  },
                }}
              />

              {children}
            </ConfirmProvider>
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </AbilityContext.Provider>
  );
}
