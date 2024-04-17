import Link from "next/link";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Launch from "@mui/icons-material/Launch";
import { TicketStatus } from "@prisma/client";

import { NotFound } from "@/components/templates/not-found";
import { Dictionary } from "@/internationalization/dictionaries/tickets";
import { SupportedLanguage } from "@/internationalization/types";

import { Ticket } from "./types";

export interface ClientTicketCardProps {
  ticket: Ticket | null;
  language: SupportedLanguage;
  dictionary: Pick<Dictionary, "ticket_model" | "ticket_card" | "not_found">;
}

export function ClientTicketCard({
  ticket,
  language,
  dictionary: { ticket_model, ticket_card, not_found },
}: ClientTicketCardProps) {
  const status: Record<TicketStatus, string> = {
    UNASSIGNED: ticket_model["status--unassigned"],
    ASSIGNED: ticket_model["status--assigned"],
    IN_PROGRESS: ticket_model["status--in-progress"],
    RESOLVED: ticket_model["status--resolved"],
    CLOSED: ticket_model["status--closed"],
    CANCELLED: ticket_model["status--cancelled"],
  };

  if (!ticket) {
    return (
      <Paper sx={{ placeContent: "center", height: "100%" }}>
        <NotFound
          heading={not_found.heading}
          description={not_found.description}
        />
      </Paper>
    );
  }

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardHeader
        subheader={ticket_card.heading}
        action={
          <IconButton
            LinkComponent={Link}
            href={`/${language}/admin/tickets/${ticket.id}`}
          >
            <Launch />
          </IconButton>
        }
      />

      <CardContent
        sx={{
          height: "100%",
          overflowY: "auto",
          borderTop: 1,
          borderTopColor: "divider",
        }}
      >
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemText
              primary={ticket_model.service}
              secondary={`${ticket.service.category.name} - ${ticket.service.name}`}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={ticket_model.status}
              secondary={status[ticket.status]}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={ticket_model.issue}
              secondary={ticket.issue}
              secondaryTypographyProps={{
                component: "pre",
                sx: { whiteSpace: "pre-wrap" },
              }}
            />
          </ListItem>

          {ticket.solution && (
            <ListItem disablePadding>
              <ListItemText
                primary={ticket_model.solution}
                secondary={ticket.solution}
                secondaryTypographyProps={{
                  component: "pre",
                  sx: { whiteSpace: "pre-wrap" },
                }}
              />
            </ListItem>
          )}

          <ListItem disablePadding>
            <ListItemText
              primary={ticket_model.createdAt}
              secondary={new Date(ticket.createdAt).toLocaleString(language)}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={ticket_model.updatedAt}
              secondary={new Date(ticket.updatedAt).toLocaleString(language)}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
