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

type ProvidersDictionary = Pick<Dictionary, "confirm_dialog">;

export interface ProvidersProps {
  lang: SupportedLanguage;
  dictionary: ProvidersDictionary;
}

export const Providers: React.FC<React.PropsWithChildren<ProvidersProps>> = ({
  lang,
  dictionary: { confirm_dialog },
  children,
}) => {
  const translations = getMuiTranslations(lang);

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
};
