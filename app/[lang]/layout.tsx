import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
