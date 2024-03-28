import { PageParams } from "@/types/page-params";

import { getDictionary } from "./dictionaries";

export interface RootPageProps {
  params: PageParams;
}

export default async function RootPage({ params: { lang } }: RootPageProps) {
  const dict = await getDictionary(lang);

  return <h1>{dict.heading}</h1>;
}
