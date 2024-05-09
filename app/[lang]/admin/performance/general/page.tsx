import { Metadata } from "next";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

import { AverageTicketResolutionTimeChart } from "@/features/performance/average-ticket-resolution-time-chart";
import { Widget } from "@/components/templates/widget";
import { getDictionary } from "@/internationalization/dictionaries/performance";
import { PageParams } from "@/types/page-params";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params: { lang },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const {
    general_performance_page: { title },
  } = await getDictionary(lang);

  return { title };
}

export default function GeneralPerformance() {
  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid xs={12} md={4}>
          <Widget>
            <AverageTicketResolutionTimeChart />
          </Widget>
        </Grid>
      </Grid>
    </Container>
  );
}
