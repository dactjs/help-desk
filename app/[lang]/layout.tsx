import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { getDictionary } from "@/internationalization/dictionaries/common";
import { PageParams } from "@/types/page-params";

import { Providers } from "./_components/providers";

export function generateStaticParams(): PageParams[] {
  return [{ lang: "en" }, { lang: "es" }];
}

export async function generateMetadata({
  params: { lang },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const {
    root: { title },
  } = await getDictionary(lang);

  return { title };
}

export interface RootLayoutProps {
  params: PageParams;
  children: React.ReactElement;
}

export default async function RootLayout({
  params: { lang },
  children,
}: RootLayoutProps) {
  const { confirm_dialog } = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body>
        <AppRouterCacheProvider>
          <Providers lang={lang} dictionary={{ confirm_dialog }}>
            {children}
            <SpeedInsights />
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
