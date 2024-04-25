import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { TicketStatus } from "@prisma/client";

import { Dictionary } from "@/internationalization/dictionaries/tickets";

import { TicketStatGridData } from "./types";

export interface ClientTicketStatGridProps {
  data: TicketStatGridData;
  dictionary: Pick<Dictionary, "ticket_model">;
}

export function ClientTicketStatGrid({
  data,
  dictionary: { ticket_model },
}: ClientTicketStatGridProps) {
  const heading: Record<TicketStatus, string> = {
    UNASSIGNED: ticket_model["status--unassigned"],
    ASSIGNED: ticket_model["status--assigned"],
    IN_PROGRESS: ticket_model["status--in-progress"],
    RESOLVED: ticket_model["status--resolved"],
    CLOSED: ticket_model["status--closed"],
    CANCELLED: ticket_model["status--cancelled"],
  };

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={1}>
      {data.map(({ status, count }) => (
        <Grid key={status} xs="auto">
          <Stack
            component={Paper}
            spacing={1}
            sx={{ minWidth: 200, padding: 2 }}
          >
            <Typography variant="caption" fontSize="large">
              {heading[status]}
            </Typography>

            <Typography variant="h4" fontWeight="bolder">
              {count}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}
