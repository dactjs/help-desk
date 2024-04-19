import { Metadata } from "next";
import Link from "next/link";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { Can } from "@/auth/ability";
import { TicketDataGrid } from "@/features/tickets/ticket-data-grid";
import { Widget } from "@/components/templates/widget";
import { getDictionary } from "@/internationalization/dictionaries/tickets";
import { PageParams } from "@/types/page-params";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params: { lang },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const {
    tickets_page: { title },
  } = await getDictionary(lang);

  return { title };
}

export interface TicketsPageProps {
  params: PageParams;
}

export default async function TicketsPage({
  params: { lang },
}: TicketsPageProps) {
  const { tickets_page } = await getDictionary(lang);

  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid xs={12}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent={{ xs: "center", sm: "flex-end" }}
            spacing={1}
          >
            <Button
              LinkComponent={Link}
              href={`/${lang}/admin/tickets/services`}
              variant="outlined"
              color="secondary"
            >
              {tickets_page["toolbar_button--manage-services"]}
            </Button>

            <Can I="create" a="Ticket">
              <Button
                LinkComponent={Link}
                href={`/${lang}/admin/tickets/create`}
                variant="contained"
                color="primary"
              >
                {tickets_page["toolbar_button--create"]}
              </Button>
            </Can>
          </Stack>
        </Grid>

        <Grid xs={12}>
          <Widget>
            <TicketDataGrid />
          </Widget>
        </Grid>
      </Grid>
    </Container>
  );
}
