import { Metadata } from "next";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

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

export default function TicketsPage() {
  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid xs={12}>
          <Widget sx={{ height: 500 }}>
            <TicketDataGrid />
          </Widget>
        </Grid>
      </Grid>
    </Container>
  );
}
