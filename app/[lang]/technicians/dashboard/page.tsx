import { Metadata } from "next";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { Widget } from "@/components/templates/widget";
import { getDictionary } from "@/internationalization/dictionaries/common";
import { PageParams } from "@/types/page-params";

export async function generateMetadata({
  params: { lang },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const {
    technicians_dashboard_page: { title },
  } = await getDictionary(lang);

  return { title };
}

export default function DashboardPage() {
  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid xs={12}>
          <Widget />
        </Grid>
      </Grid>
    </Container>
  );
}
