import { Metadata } from "next";
import Link from "next/link";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { Can } from "@/auth/ability";
import { Widget } from "@/components/templates/widget";
import { getDictionary } from "@/internationalization/dictionaries/common";
import { PageParams } from "@/types/page-params";

import { TicketDataGrid } from "./_components/ticket-data-grid";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params: { lang },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const {
    dashboard_root: { title },
  } = await getDictionary(lang);

  return { title };
}

export interface DashboardPageProps {
  params: PageParams;
}

export default async function DashboardPage({
  params: { lang },
}: DashboardPageProps) {
  const { dashboard_root } = await getDictionary(lang);

  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid xs={12}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent={{ xs: "center", sm: "flex-end" }}
            spacing={1}
          >
            <Can I="create" a="Ticket">
              <Button
                LinkComponent={Link}
                href={`/${lang}/dashboard/tickets/create`}
                variant="contained"
                color="primary"
              >
                {dashboard_root["toolbar_button--create"]}
              </Button>
            </Can>
          </Stack>
        </Grid>

        <Grid xs={12}>
          <Widget sx={{ height: 500 }}>
            <TicketDataGrid />
          </Widget>
        </Grid>
      </Grid>
    </Container>
  );
}
