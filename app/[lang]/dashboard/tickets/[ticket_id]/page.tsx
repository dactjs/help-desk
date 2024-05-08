import { Metadata } from "next";
import { notFound } from "next/navigation";
import NextLink from "next/link";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import MuiLink from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import TicketsIcon from "@mui/icons-material/ConfirmationNumber";
import { subject } from "@casl/ability";
import { UserRole } from "@prisma/client";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { TicketCard } from "@/features/tickets/ticket-card";
import { TicketTraceTimeline } from "@/features/tickets/ticket-trace-timeline";
import { TicketComments } from "@/features/tickets/ticket-comments";
import { UserCard } from "@/features/users/user-card";
import { Widget } from "@/components/templates/widget";
import { getDictionary } from "@/internationalization/dictionaries/tickets";
import { replacePlaceholders } from "@/internationalization/utils/replace-placeholders";
import { getShortUUID } from "@/utils/get-short-uuid";
import { prisma } from "@/lib/prisma";
import { PageParams } from "@/types/page-params";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params: { lang, ticket_id },
}: {
  params: TicketPageParams;
}): Promise<Metadata> {
  const {
    ticket_page: { title },
  } = await getDictionary(lang);

  const replaced = replacePlaceholders(title, {
    id: getShortUUID(ticket_id),
  });

  return { title: replaced };
}

type TicketPageParams = PageParams<{
  ticket_id: string;
}>;

export interface TicketPageProps {
  params: TicketPageParams;
}

export default async function TicketPage({
  params: { lang, ticket_id },
}: TicketPageProps) {
  const [session, ticket, { ticket_page }] = await Promise.all([
    auth(),
    prisma.ticket.findUnique({ where: { id: ticket_id } }),
    getDictionary(lang),
  ]);

  const ability = createAbilityFor(session);

  if (!ticket || !ability.can("read", subject("Ticket", ticket))) notFound();

  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid role="presentation" xs={12}>
          <Breadcrumbs aria-label={ticket_page.breadcrumbs.label}>
            <MuiLink
              component={NextLink}
              href={`/${lang}/dashboard`}
              color="inherit"
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <HomeIcon fontSize="inherit" sx={{ mr: 0.5 }} />
              {ticket_page.breadcrumbs.dashboard}
            </MuiLink>

            <MuiLink
              color="text.primary"
              underline="none"
              aria-current="page"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <TicketsIcon fontSize="inherit" sx={{ mr: 0.5 }} />
              {ticket_page.breadcrumbs.tickets}
            </MuiLink>
          </Breadcrumbs>
        </Grid>

        <Grid xs={12} md={5}>
          <Widget>
            <TicketCard ticketId={ticket_id} />
          </Widget>
        </Grid>

        <Grid xs={12} md={7}>
          <Widget>
            <TicketTraceTimeline ticketId={ticket_id} />
          </Widget>
        </Grid>

        {ticket.assignedToId && (
          <Grid xs={12} md={6}>
            <Widget>
              <UserCard
                variant={UserRole.TECHNICIAN}
                userId={ticket.assignedToId}
              />
            </Widget>
          </Grid>
        )}

        <Grid xs={12} md={ticket.assignedToId ? 6 : 12}>
          <Widget>
            <TicketComments ticketId={ticket.id} />
          </Widget>
        </Grid>
      </Grid>
    </Container>
  );
}
