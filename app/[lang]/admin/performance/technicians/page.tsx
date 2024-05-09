import { Metadata } from "next";
import { ReadonlyURLSearchParams } from "next/navigation";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { UserRole } from "@prisma/client";
import { startOfMonth } from "date-fns/startOfMonth";
import { endOfMonth } from "date-fns/endOfMonth";

import { UserCard } from "@/features/users/user-card";
import { AverageTicketFirstContactTimeChart } from "@/features/performance/average-ticket-first-contact-time-chart";
import { AverageTicketResolutionTimeChart } from "@/features/performance/average-ticket-resolution-time-chart";
import { Widget } from "@/components/templates/widget";
import { getDictionary } from "@/internationalization/dictionaries/performance";
import { PageParams } from "@/types/page-params";

import { IndividualPerformanceToolbar } from "./_components/toolbar";
import { ParamsSchema } from "./_schemas";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params: { lang },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const {
    individual_performance_page: { title },
  } = await getDictionary(lang);

  return { title };
}

export interface IndividualPerformanceProps {
  params: PageParams;
  searchParams: ReadonlyURLSearchParams;
}

export default async function IndividualPerformance({
  params: { lang },
  searchParams,
}: IndividualPerformanceProps) {
  const {
    individual_performance_page: { heading, hint },
  } = await getDictionary(lang);

  const params = new URLSearchParams(searchParams);

  const result = ParamsSchema.safeParse(Object.fromEntries(params));

  const technician = result.data?.technician?.id;
  const start = result.data?.start ?? startOfMonth(new Date());
  const end = result.data?.end ?? endOfMonth(new Date());

  if (!technician) {
    return (
      <Container fixed sx={{ display: "grid", height: "100%", paddingY: 2 }}>
        <Stack
          spacing={2}
          divider={<Divider flexItem />}
          sx={{ height: "100%" }}
        >
          <Widget sx={{ height: "auto" }}>
            <IndividualPerformanceToolbar />
          </Widget>

          <Stack justifyContent="center" alignItems="center" sx={{ flex: 1 }}>
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
          </Stack>
        </Stack>
      </Container>
    );
  }

  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid xs={12}>
          <Widget sx={{ height: "auto" }}>
            <IndividualPerformanceToolbar />
          </Widget>
        </Grid>

        <Grid xs={12}>
          <Divider flexItem />
        </Grid>

        <Grid xs={12} md={4}>
          <Widget>
            <UserCard variant={UserRole.TECHNICIAN} userId={technician} />
          </Widget>
        </Grid>

        <Grid xs={12} md={4}>
          <Widget>
            <AverageTicketFirstContactTimeChart
              start={start}
              end={end}
              technicianId={technician}
            />
          </Widget>
        </Grid>

        <Grid xs={12} md={4}>
          <Widget>
            <AverageTicketResolutionTimeChart
              start={start}
              end={end}
              technicianId={technician}
            />
          </Widget>
        </Grid>
      </Grid>
    </Container>
  );
}
