import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { PageParams } from "@/types/page-params";

import { getDictionary } from "./dictionaries";

export interface RootPageProps {
  params: PageParams;
}

export default async function RootPage({ params: { lang } }: RootPageProps) {
  const dict = await getDictionary(lang);

  return (
    <Container>
      <Typography>{dict.heading}</Typography>
    </Container>
  );
}
