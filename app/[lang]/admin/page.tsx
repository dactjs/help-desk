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
    admin_page: { title },
  } = await getDictionary(lang);

  return { title };
}

export interface AdminPageProps {
  params: PageParams;
}

export default async function AdminPage({ params: { lang } }: AdminPageProps) {
  const {
    admin_page: { heading, hint },
  } = await getDictionary(lang);

  return (
    <Container
      fixed
      sx={{
        display: "grid",
        minHeight: "100%",
        placeContent: "center",
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        align="center"
        fontWeight="bolder"
      >
        {heading}
      </Typography>

      <Typography
        component="p"
        variant="body1"
        align="center"
        color="text.secondary"
      >
        {hint}
      </Typography>
    </Container>
  );
}
