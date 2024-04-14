import { Metadata } from "next";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { getDictionary } from "@/internationalization/dictionaries/common";
import { PageParams } from "@/types/page-params";

export async function generateMetadata({
  params: { lang },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const {
    admin_root: { title },
  } = await getDictionary(lang);

  return { title };
}

export interface DashboardPageProps {
  params: PageParams;
}

export default async function DashboardPage({
  params: { lang },
}: DashboardPageProps) {
  const {
    admin_root: { title },
  } = await getDictionary(lang);

  return (
    <Container>
      <Typography>{title}</Typography>
    </Container>
  );
}
