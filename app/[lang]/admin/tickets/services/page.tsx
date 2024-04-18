import { Metadata } from "next";
import Link from "next/link";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";

import { Can } from "@/auth/ability";
import { TicketServiceDataGrid } from "@/features/tickets/ticket-service-data-grid";
import { TicketServiceCategoryDataGrid } from "@/features/tickets/ticket-service-category-data-grid";
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
    ticket_services_page: { title },
  } = await getDictionary(lang);

  return { title };
}

export interface TicketServicesPageProps {
  params: PageParams;
}

export default async function TicketServicesPage({
  params: { lang },
}: TicketServicesPageProps) {
  const { ticket_services_page } = await getDictionary(lang);

  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Toolbar sx={{ justifyContent: "flex-end", gap: 1 }}>
        <Can I="create" a="TicketServiceCategory">
          <Button
            LinkComponent={Link}
            href={`/${lang}/admin/tickets/services/categories/create`}
            variant="outlined"
            color="secondary"
          >
            {ticket_services_page["toolbar_button--create-category"]}
          </Button>
        </Can>

        <Can I="create" a="TicketService">
          <Button
            LinkComponent={Link}
            href={`/${lang}/admin/tickets/services/create`}
            variant="contained"
            color="primary"
          >
            {ticket_services_page["toolbar_button--create-service"]}
          </Button>
        </Can>
      </Toolbar>

      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid xs={12} md={7}>
          <Widget>
            <TicketServiceDataGrid />
          </Widget>
        </Grid>

        <Grid xs={12} md={5}>
          <Widget>
            <TicketServiceCategoryDataGrid />
          </Widget>
        </Grid>
      </Grid>
    </Container>
  );
}
