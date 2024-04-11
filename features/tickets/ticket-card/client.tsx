"use client";

import {
  Paper,
  Stack,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";

import { NotFound } from "@/components/templates/not-found";
import { getShortUUID } from "@/utils/get-short-uuid";

import { Ticket } from "./types";

export interface ClientTicketCardProps {
  ticket: Ticket | null;
}

export function ClientTicketCard({
  ticket,
}: ClientTicketCardProps): React.ReactElement {
  if (!ticket) {
    return (
      <Paper sx={{ height: "100%" }}>
        <NotFound
          heading="Ticket no encontrado"
          description="El servidor web no pudo encontrar el ticket solicitado"
        />
      </Paper>
    );
  }

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardHeader subheader={`Ticket ID: ${getShortUUID(ticket.id)}`} />

      <CardContent
        sx={{
          height: "100%",
          overflowY: "auto",
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Stack spacing={1} divider={<Divider flexItem />}>
          <Typography variant="h6" fontWeight="bolder" color="warning.main">
            {`${ticket.service.category.name} - ${ticket.service.name}`}
          </Typography>

          {/* TODO: add <ReadOnlyRichText /> */}
          <Typography>{ticket.issue}</Typography>

          {/* TODO: add solution with <ReadOnlyRichText /> */}
          {Boolean(ticket.solution) && (
            <Typography>{ticket.solution}</Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
