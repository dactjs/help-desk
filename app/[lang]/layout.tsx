import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { PageParams } from "@/types/page-params";

import { Providers } from "./_components/providers";
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
          <Providers lang={lang}>
            {children}
            <SpeedInsights />
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
