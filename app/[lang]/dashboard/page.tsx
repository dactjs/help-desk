import { Metadata } from "next";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { PageParams } from "@/types/page-params";

import { getDictionary } from "./_dictionaries";

export async function generateMetadata({
  params: { lang },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { title } = await getDictionary(lang);

  return { title };
}

export interface DashboardPageProps {
  params: PageParams;
}

export default async function DashboardPage({
  params: { lang },
}: DashboardPageProps) {
  const { heading } = await getDictionary(lang);

  return (
    <Container>
      <Typography>{heading}</Typography>
    </Container>
  );
}
