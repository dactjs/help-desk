"use client";

import { Roboto } from "next/font/google";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { brown } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { SnackbarProvider } from "notistack";
import { ConfirmProvider } from "material-ui-confirm";

import { Dictionary } from "@/internationalization/dictionaries/common";
import { getMuiTranslations } from "@/internationalization/utils/get-mui-translations";
import { SupportedLanguage } from "@/internationalization/types";

const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export interface ProvidersProps {
  language: SupportedLanguage;
  dictionary: Pick<Dictionary, "confirm_dialog">;
  children: React.ReactNode;
}

export function Providers({
  language,
  dictionary: { confirm_dialog },
  children,
}: ProvidersProps) {
  const translations = getMuiTranslations(language);

  const theme = createTheme(
    {
      palette: { primary: { main: "#429440" }, secondary: brown },
      typography: { fontFamily: roboto.style.fontFamily },
    },
    ...translations
  );

  return (
    <ThemeProvider theme={theme}>
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
                scrollbarColor: "chocolate transparent",
              },
            }}
          />

          {children}
        </ConfirmProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
