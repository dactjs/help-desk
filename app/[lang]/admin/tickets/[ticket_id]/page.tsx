import { Metadata } from "next";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

import { Widget } from "@/components/templates/widget";
import { replacePlaceholders } from "@/internationalization/utils/replace-placeholders";
import { getShortUUID } from "@/utils/get-short-uuid";
import { PageParams } from "@/types/page-params";

import { TicketCard } from "@/features/tickets/ticket-card";
import { TicketTraceTimeline } from "@/features/tickets/ticket-trace-timeline";

import { getDictionary } from "./_dictionaries";

export async function generateMetadata({
  params: { lang, ticket_id },
}: {
  params: TicketPageParams;
}): Promise<Metadata> {
  const { title } = await getDictionary(lang);

  const replaced = replacePlaceholders(title, {
    id: getShortUUID(ticket_id),
  });

  return { title: replaced };
}

type TicketPageParams = PageParams & {
  ticket_id: string;
};

export interface TicketPageProps {
  params: TicketPageParams;
}

export default function TicketPage({ params: { ticket_id } }: TicketPageProps) {
  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid xs={4}>
          <Widget>
            <TicketCard ticketId={ticket_id} />
          </Widget>
        </Grid>

        <Grid xs={8}>
          <Widget>
            <TicketTraceTimeline ticketId={ticket_id} />
          </Widget>
        </Grid>
      </Grid>
    </Container>
  );
}
