"use client";

import { Roboto } from "next/font/google";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { brown } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { SnackbarProvider } from "notistack";
import { ConfirmProvider } from "material-ui-confirm";

import { getMuiTranslations } from "@/internationalization/utils/get-mui-translations";
import { SupportedLanguage } from "@/internationalization/types";

const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export interface ProvidersProps {
  lang: SupportedLanguage;
}

export const Providers: React.FC<React.PropsWithChildren<ProvidersProps>> = ({
  lang,
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
        <ConfirmProvider>
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
