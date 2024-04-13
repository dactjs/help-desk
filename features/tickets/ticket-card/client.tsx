import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { TicketStatus } from "@prisma/client";

import { NotFound } from "@/components/templates/not-found";
import { Dictionary } from "@/internationalization/dictionaries/tickets";
import { SupportedLanguage } from "@/internationalization/types";

import { Ticket } from "./types";

export type ClientTicketCardDictionary = Pick<
  Dictionary,
  "model" | "not_found" | "ticket_card"
>;

export interface ClientTicketCardProps {
  ticket: Ticket | null;
  language: SupportedLanguage;
  dictionary: ClientTicketCardDictionary;
}

export const ClientTicketCard: React.FC<ClientTicketCardProps> = ({
  ticket,
  language,
  dictionary,
}) => {
  const status: Record<TicketStatus, string> = {
    UNASSIGNED: dictionary.model["status--unassigned"],
    ASSIGNED: dictionary.model["status--assigned"],
    IN_PROGRESS: dictionary.model["status--in-progress"],
    RESOLVED: dictionary.model["status--resolved"],
    CLOSED: dictionary.model["status--closed"],
    CANCELLED: dictionary.model["status--cancelled"],
  };

  if (!ticket) {
    return (
      <Paper sx={{ placeContent: "center", height: "100%" }}>
        <NotFound
          heading={dictionary.not_found.heading}
          description={dictionary.not_found.description}
        />
      </Paper>
    );
  }

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardHeader subheader={dictionary.ticket_card.heading} />

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
              primary={dictionary.model.service}
              secondary={`${ticket.service.category.name} - ${ticket.service.name}`}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={dictionary.model.status}
              secondary={status[ticket.status]}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={dictionary.model.issue}
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
                primary={dictionary.model.solution}
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
              primary={dictionary.model.createdAt}
              secondary={new Date(ticket.createdAt).toLocaleString(language)}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={dictionary.model.updatedAt}
              secondary={new Date(ticket.updatedAt).toLocaleString(language)}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};
