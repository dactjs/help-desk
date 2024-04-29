import Link from "next/link";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LaunchIcon from "@mui/icons-material/Launch";
import { TicketTraceType } from "@prisma/client";

import { replacePlaceholders } from "@/internationalization/utils/replace-placeholders";
import { Dictionary } from "@/internationalization/dictionaries/tickets";
import { SupportedLanguage } from "@/internationalization/types";

import { TicketTrace } from "../../types";

export interface TicketTraceDetailsDialogProps extends DialogProps {
  trace: TicketTrace;
  context: string | null;
  language: SupportedLanguage;
  dictionary: Pick<
    Dictionary,
    "ticket_trace_model" | "ticket_trace_details_dialog"
  >;
}

export function TicketTraceDetailsDialog({
  trace,
  context,
  language,
  dictionary: { ticket_trace_model, ticket_trace_details_dialog },
  ...rest
}: TicketTraceDetailsDialogProps) {
  const type: Record<TicketTraceType, string> = {
    [TicketTraceType.RECEPTION]: ticket_trace_model["type--reception"],
    [TicketTraceType.ASSIGNMENT]: ticket_trace_model["type--assignment"],
    [TicketTraceType.OPENED]: ticket_trace_model["type--opened"],
    [TicketTraceType.TRANSFER]: ticket_trace_model["type--transfer"],
    [TicketTraceType.RESOLVED]: ticket_trace_model["type--resolved"],
    [TicketTraceType.CLOSED]: ticket_trace_model["type--closed"],
    [TicketTraceType.CANCELLED]: ticket_trace_model["type--cancelled"],
  };

  return (
    <Dialog {...rest}>
      <DialogContent>
        <DialogContentText fontWeight="bolder" color="text.primary">
          {replacePlaceholders(ticket_trace_details_dialog.description, {
            action: type[trace.type],
            timestamp: trace.createdAt.toLocaleString(language),
          })}
        </DialogContentText>

        <Divider sx={{ marginY: 2 }} />

        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          {[
            {
              heading: ticket_trace_details_dialog.made_by,
              user: trace.madeBy,
            },
            {
              heading: ticket_trace_details_dialog.origin,
              user: trace.origin,
            },
            {
              heading: ticket_trace_details_dialog.destination,
              user: trace.destination,
            },
          ]
            .filter(({ user }) => Boolean(user))
            .map(({ heading, user }) => (
              <Grid key={heading} xs={6}>
                <Card>
                  <CardHeader
                    subheader={heading}
                    action={
                      context && (
                        <IconButton
                          LinkComponent={Link}
                          href={`${context}/users/${user?.id}`}
                        >
                          <LaunchIcon />
                        </IconButton>
                      )
                    }
                  />

                  <CardContent sx={{ borderTop: 1, borderTopColor: "divider" }}>
                    <Typography noWrap>
                      {`${user?.name} (${user?.username})`}
                    </Typography>

                    <Typography noWrap variant="caption">
                      {user?.email}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
