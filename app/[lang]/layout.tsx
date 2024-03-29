import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { theme } from "@/config/theme";
import { PageParams } from "@/types/page-params";

export const metadata: Metadata = {
  title: "Help Desk",
};

export function generateStaticParams(): PageParams[] {
  return [{ lang: "en" }, { lang: "es" }];
}

export interface RootLayoutProps {
  params: PageParams;
  children: React.ReactElement;
}

export default function RootLayout({ params, children }: RootLayoutProps) {
  return (
    <html lang={params.lang}>
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>

      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
