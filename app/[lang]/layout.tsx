import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { theme } from "@/config/theme";
import { PageParams } from "@/types/page-params";

import { ClientProviders } from "./_components/client-providers";
import { getDictionary } from "./_dictionaries";

export function generateStaticParams(): PageParams[] {
  return [{ lang: "en" }, { lang: "es" }];
}

export async function generateMetadata({
  params: { lang },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { title } = await getDictionary(lang);

  return { title };
}

export interface RootLayoutProps {
  params: PageParams;
  children: React.ReactElement;
}

export default function RootLayout({
  params: { lang },
  children,
}: RootLayoutProps) {
  return (
    <html lang={lang}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ClientProviders>
              {children}
              <SpeedInsights />
            </ClientProviders>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
