"use client";

import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import { Empty } from "@/components/templates/empty";
import { Dictionary } from "@/internationalization/dictionaries/tickets";

import { Search } from "./components/search";
import { StatusFilters } from "./components/status-filters";
import { TicketItem } from "./components/ticket-item";
import { Pagination } from "./components/pagination";
import { Ticket } from "./types";

export interface ClientTicketListProps {
  tickets: Ticket[];
  count: number;
  dictionary: Pick<Dictionary, "ticket_list">;
}

export function ClientTicketList({
  tickets,
  count,
  dictionary: { ticket_list },
}: ClientTicketListProps): React.ReactElement {
  return (
    <Stack
      spacing={1}
      divider={<Divider flexItem />}
      sx={{ height: "100%", overflow: "hidden" }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <StatusFilters />
        <Search placeholder={ticket_list.search_placeholder} />
      </Stack>

      <Stack
        spacing={2}
        sx={{
          justifyContent: tickets.length > 0 ? "flex-start" : "center",
          height: "100%",
          overflow: "auto",
        }}
      >
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <TicketItem key={ticket.id} ticket={ticket} />
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
