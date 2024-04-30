"use client";

import { Paper, Stack, Typography, Checkbox, Tooltip } from "@mui/material";
import { TicketStatus } from "@prisma/client";

import { getShortUUID } from "@/utils/get-short-uuid";

import { Ticket } from "../types";

export interface TicketItemProps {
  ticket: Ticket;
}

export function TicketItem({ ticket }: TicketItemProps) {
  const colorByStatus = {
    [TicketStatus.UNASSIGNED]: "default",
    [TicketStatus.ASSIGNED]: "info",
    [TicketStatus.IN_PROGRESS]: "warning",
    [TicketStatus.RESOLVED]: "success",
    [TicketStatus.CLOSED]: "success",
    [TicketStatus.CANCELLED]: "error",
  } as const;

  const title = [
    getShortUUID(ticket.id),
    ticket.status,
    ticket.service.name,
    ticket.service.category.name,
  ].join(" - ");

  const description = [
    "Enviado por",
    ticket.sentBy.name,
    "el",
    new Date(ticket.createdAt).toLocaleString("es-do"),
  ].join(" ");

  const isSelected = false;

  const handleClick = (): void => {};

  const handleSelect = (): void => {};

  return (
    <Tooltip title={ticket.issue}>
      <Paper
        onClick={handleClick}
        sx={{
          padding: 2,
          transition: "background-color 0.2s ease-in-out",
          "&:hover": {
            cursor: "pointer",
            backgroundColor: (theme) => theme.palette.action.hover,
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Stack>
            <Typography
              fontWeight="bolder"
              color={colorByStatus[ticket.status]}
            >
              {title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Stack>

          <Checkbox
            checked={isSelected}
            onChange={handleSelect}
            onClick={(event) => {
              event.stopPropagation();
            }}
          />
        </Stack>
      </Paper>
    </Tooltip>
  );
}
