import { Metadata } from "next";
import { ReadonlyURLSearchParams } from "next/navigation";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import { startOfMonth } from "date-fns/startOfMonth";
import { endOfMonth } from "date-fns/endOfMonth";

import { MVPCard } from "@/features/performance/mvp-card";
import { AverageTicketFirstContactTimeChart } from "@/features/performance/average-ticket-first-contact-time-chart";
import { AverageTicketResolutionTimeChart } from "@/features/performance/average-ticket-resolution-time-chart";
import { Widget } from "@/components/templates/widget";
import { getDictionary } from "@/internationalization/dictionaries/performance";
import { PageParams } from "@/types/page-params";

import { GeneralPerformanceToolbar } from "./_components/toolbar";
import { ParamsSchema } from "./_schemas";

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

export interface GeneralPerformanceProps {
  params: PageParams;
  searchParams: ReadonlyURLSearchParams;
}

export default function GeneralPerformance({
  searchParams,
}: GeneralPerformanceProps) {
  const params = new URLSearchParams(searchParams);

  const result = ParamsSchema.safeParse(Object.fromEntries(params));

  const start = result.data?.start ?? startOfMonth(new Date());
  const end = result.data?.end ?? endOfMonth(new Date());

  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid xs={12}>
          <Widget sx={{ height: "auto" }}>
            <GeneralPerformanceToolbar />
          </Widget>
        </Grid>

        <Grid xs={12}>
          <Divider flexItem />
        </Grid>

        <Grid xs={12} md={4}>
          <Widget>
            <MVPCard start={start} end={end} />
          </Widget>
        </Grid>

        <Grid xs={12} md={4}>
          <Widget>
            <AverageTicketFirstContactTimeChart start={start} end={end} />
          </Widget>
        </Grid>

        <Grid xs={12} md={4}>
          <Widget>
            <AverageTicketResolutionTimeChart start={start} end={end} />
          </Widget>
        </Grid>
      </Grid>
    </Container>
  );
}
