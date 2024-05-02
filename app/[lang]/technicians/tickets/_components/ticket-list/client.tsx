"use client";

import { useState } from "react";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import Tooltip from "@mui/material/Tooltip";
import TakeIcon from "@mui/icons-material/AssignmentInd";
import OpenIcon from "@mui/icons-material/HourglassBottom";
import ResolveIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { subject } from "@casl/ability";
import { TicketStatus } from "@prisma/client";

import { Can } from "@/auth/ability";
import { TicketActionDialog } from "@/features/tickets/ticket-action-dialog";
import { TicketActionDialogType } from "@/features/tickets/ticket-action-dialog/types";
import { Empty } from "@/components/templates/empty";
import { replacePlaceholders } from "@/internationalization/utils/replace-placeholders";
import { Dictionary } from "@/internationalization/dictionaries/tickets";
import { SupportedLanguage } from "@/internationalization/types";
import { getShortUUID } from "@/utils/get-short-uuid";

import { Search } from "./components/search";
import { StatusFilter } from "./components/status-filter";
import { TechniciansFilter } from "./components/technicians-filter";
import { AdvancedSettings } from "./components/advanced-settings";
import { Pagination } from "./components/pagination";
import { Ticket } from "./types";

export interface ClientTicketListProps {
  tickets: Ticket[];
  count: number;
  language: SupportedLanguage;
  dictionary: Pick<
    Dictionary,
    "ticket_model" | "ticket_list" | "ticket_action_dialog"
  >;
}

export function ClientTicketList({
  tickets,
  count,
  language,
  dictionary: { ticket_model, ticket_list, ticket_action_dialog },
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

  const [selected, setSelected] = useState<Ticket | null>(null);

  const [action, setAction] = useState<{
    type: TicketActionDialogType;
    ticketId: string;
    origin: Ticket["assignedTo"];
  } | null>(null);

  const handleSelect =
    (ticket: Ticket) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setSelected(ticket.id !== selected?.id ? ticket : null);
    };

  const handleClose = () => {
    setSelected(null);
    setAction(null);
  };

  return (
    <>
      {action && (
        <TicketActionDialog
          fullWidth
          type={action.type}
          ticketId={action.ticketId}
          origin={action.origin}
          dictionary={{ ticket_action_dialog }}
          open={Boolean(action)}
          close={handleClose}
        />
      )}

      <Stack
        spacing={1}
        divider={<Divider flexItem />}
        sx={{ height: "100%", paddingY: 2, overflow: "hidden" }}
      >
        {selected && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent={{ xs: "center", sm: "flex-start" }}
            spacing={1}
          >
            <Can I="take" this={subject("Ticket", selected)} passThrough>
              {(allowed) => (
                <Button
                  variant="contained"
                  size="small"
                  color="info"
                  disabled={!allowed}
                  endIcon={<TakeIcon />}
                  onClick={() =>
                    setAction({
                      type: TicketActionDialogType.TAKE,
                      ticketId: selected.id,
                      origin: selected.assignedTo,
                    })
                  }
                >
                  {ticket_list["actions--take"]}
                </Button>
              )}
            </Can>

            <Can I="open" this={subject("Ticket", selected)} passThrough>
              {(allowed) => (
                <Button
                  variant="contained"
                  size="small"
                  color="warning"
                  disabled={!allowed}
                  endIcon={<OpenIcon />}
                  onClick={() =>
                    setAction({
                      type: TicketActionDialogType.OPEN,
                      ticketId: selected.id,
                      origin: selected.assignedTo,
                    })
                  }
                >
                  {ticket_list["actions--open"]}
                </Button>
              )}
            </Can>

            <Can I="resolve" this={subject("Ticket", selected)} passThrough>
              {(allowed) => (
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  disabled={!allowed}
                  endIcon={<ResolveIcon />}
                  onClick={() =>
                    setAction({
                      type: TicketActionDialogType.RESOLVE,
                      ticketId: selected.id,
                      origin: selected.assignedTo,
                    })
                  }
                >
                  {ticket_list["actions--resolve"]}
                </Button>
              )}
            </Can>

            <Can I="cancel" this={subject("Ticket", selected)} passThrough>
              {(allowed) => (
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  disabled={!allowed}
                  endIcon={<CancelIcon />}
                  onClick={() =>
                    setAction({
                      type: TicketActionDialogType.CANCEL,
                      ticketId: selected.id,
                      origin: selected.assignedTo,
                    })
                  }
                >
                  {ticket_list["actions--cancel"]}
                </Button>
              )}
            </Can>
          </Stack>
        )}

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
            <StatusFilter dictionary={{ ticket_model }} />
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

                    <Radio
                      checked={ticket.id === selected?.id}
                      onClick={handleSelect(ticket)}
                    />
                  </Stack>
                </Paper>
              </Tooltip>
            ))
          ) : (
            <Empty caption={ticket_list["empty-caption"]} />
          )}
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent={{ xs: "center", sm: "space-between" }}
          alignItems="center"
          spacing={1}
        >
          <AdvancedSettings
            heading={ticket_list.advanced_settings_heading}
            page_size_field_label={ticket_list.page_size_field_label}
          />

          {count > 0 && <Pagination count={count} />}
        </Stack>
      </Stack>
    </>
  );
}
