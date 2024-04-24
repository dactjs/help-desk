import { Metadata } from "next";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

import { TicketCompletionRateChart } from "@/features/tickets/ticket-completion-rate-chart";
import { Widget } from "@/components/templates/widget";
import { getDictionary } from "@/internationalization/dictionaries/common";
import { PageParams } from "@/types/page-params";

export async function generateMetadata({
  params: { lang },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const {
    admin_dashboard_page: { title },
  } = await getDictionary(lang);

  return { title };
}

export default function DashboardPage() {
  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid xs={12} md={8}>
          <Widget />
        </Grid>

        <Grid xs={12} md={4}>
          <Widget>
            <TicketCompletionRateChart />
          </Widget>
        </Grid>
      </Grid>
    </Container>
  );
}
