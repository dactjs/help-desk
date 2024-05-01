"use client";

import Link from "next/link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { TicketStatus } from "@prisma/client";

import { Empty } from "@/components/templates/empty";
import { replacePlaceholders } from "@/internationalization/utils/replace-placeholders";
import { Dictionary } from "@/internationalization/dictionaries/tickets";
import { SupportedLanguage } from "@/internationalization/types";
import { getShortUUID } from "@/utils/get-short-uuid";

import { Search } from "./components/search";
import { StatusFilter } from "./components/status-filter";
import { TechniciansFilter } from "./components/technicians-filter";
import { Pagination } from "./components/pagination";
import { Ticket } from "./types";

export interface ClientTicketListProps {
  tickets: Ticket[];
  count: number;
  language: SupportedLanguage;
  dictionary: Pick<Dictionary, "ticket_model" | "ticket_list">;
}

export function ClientTicketList({
  tickets,
  count,
  language,
  dictionary: { ticket_model, ticket_list },
}: ClientTicketListProps) {
  const status: Record<TicketStatus, string> = {
    UNASSIGNED: ticket_model["status--unassigned"],
    ASSIGNED: ticket_model["status--assigned"],
    IN_PROGRESS: ticket_model["status--in-progress"],
    RESOLVED: ticket_model["status--resolved"],
    CLOSED: ticket_model["status--closed"],
    CANCELLED: ticket_model["status--cancelled"],
  };

  const colors: Record<TicketStatus, string> = {
    UNASSIGNED: "warning.main",
    ASSIGNED: "info.main",
    IN_PROGRESS: "default",
    RESOLVED: "success.light",
    CLOSED: "success.dark",
    CANCELLED: "error.main",
  };

  return (
    <Stack
      spacing={1}
      divider={<Divider flexItem />}
      sx={{ height: "100%", paddingY: 2, overflow: "hidden" }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Stack
          direction="row"
          spacing={0.5}
          divider={<Divider flexItem orientation="vertical" />}
        >
          <StatusFilter />
          <TechniciansFilter label={ticket_list.technicians_field_label} />
        </Stack>

        <Search placeholder={ticket_list.search_placeholder} />
      </Stack>

      <Stack
        component="ul"
        spacing={2}
        sx={{
          justifyContent: tickets.length > 0 ? "flex-start" : "center",
          height: "100%",
          padding: 0,
          overflow: "auto",
        }}
      >
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <Tooltip key={ticket.id} title={ticket.issue}>
              <Paper
                component={Link}
                href={`/${language}/technicians/tickets/${ticket.id}`}
                sx={{
                  padding: 2,
                  textDecoration: "none",
                  transition: "background-color 0.2s ease-in-out",
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <Stack
                  component="li"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={1}
                >
                  <Stack>
                    <Typography
                      fontWeight="bolder"
                      color={colors[ticket.status]}
                    >
                      {replacePlaceholders(ticket_list.item_heading, {
                        id: getShortUUID(ticket.id),
                        status: status[ticket.status],
                        service: ticket.service.name,
                      })}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {replacePlaceholders(ticket_list.item_subHeading, {
                        name: ticket.sentBy.name,
                        timestamp: ticket.createdAt.toLocaleString(language),
                      })}
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>
            </Tooltip>
          ))
        ) : (
          <Empty caption={ticket_list["empty-caption"]} />
        )}
      </Stack>

      {tickets.length > 0 && (
        <Stack
          direction="row"
          justifyContent={{ xs: "center", sm: "flex-end" }}
          alignItems="center"
          spacing={1}
        >
          <Pagination count={count} />
        </Stack>
      )}
    </Stack>
  );
}
