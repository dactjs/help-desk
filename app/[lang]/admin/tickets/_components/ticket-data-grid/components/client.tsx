"use client";

import Chip, { ChipProps } from "@mui/material/Chip";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { TicketStatus } from "@prisma/client";

import { getShortUUID } from "@/utils/get-short-uuid";

import { Dictionary } from "../dictionaries";
import { Ticket } from "../schemas/ticket";

export interface ClientTicketDataGridProps {
  tickets: Ticket[];
  dictionary: Dictionary;
}

export const ClientTicketDataGrid: React.FC<ClientTicketDataGridProps> = ({
  tickets,
  dictionary,
}) => {
  const columns: GridColDef<Ticket>[] = [
    {
      field: "id",
      headerName: dictionary.id,
      headerAlign: "center",
      align: "center",
      width: 75,
      valueGetter: (value) => getShortUUID(value),
    },
    {
      field: "service",
      headerName: dictionary.service,
      headerAlign: "center",
      align: "center",
      minWidth: 225,
      valueGetter: (value: Ticket["service"]) => value.name,
    },
    {
      field: "status",
      headerName: dictionary.status,
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: (params) => {
        const dict: Record<TicketStatus, string> = {
          UNASSIGNED: dictionary["status--unassigned"],
          ASSIGNED: dictionary["status--assigned"],
          IN_PROGRESS: dictionary["status--in-progress"],
          RESOLVED: dictionary["status--resolved"],
          CLOSED: dictionary["status--closed"],
          CANCELLED: dictionary["status--cancelled"],
        };

        const colors: Record<TicketStatus, ChipProps["color"]> = {
          UNASSIGNED: "warning",
          ASSIGNED: "info",
          IN_PROGRESS: "default",
          RESOLVED: "success",
          CLOSED: "success",
          CANCELLED: "error",
        };

        return (
          <Chip
            variant="filled"
            label={dict[params.row.status] ?? "???"}
            color={colors[params.row.status] ?? "default"}
          />
        );
      },
    },
    {
      field: "sentBy",
      headerName: dictionary.sentBy,
      headerAlign: "center",
      align: "center",
      minWidth: 225,
      valueGetter: (value: Ticket["sentBy"]) => value.name,
    },
    {
      field: "assignedTo",
      headerName: dictionary.assignedTo,
      headerAlign: "center",
      align: "center",
      minWidth: 225,
      valueGetter: (value: Ticket["assignedTo"]) => value?.name ?? "--",
    },
    {
      type: "dateTime",
      field: "createdAt",
      headerName: dictionary.createdAt,
      headerAlign: "center",
      align: "center",
      minWidth: 180,
    },
    {
      type: "dateTime",
      field: "updatedAt",
      headerName: dictionary.updatedAt,
      headerAlign: "center",
      align: "center",
      minWidth: 180,
    },
  ];

  return (
    <DataGrid
      disableRowSelectionOnClick
      columns={columns}
      rows={tickets}
      slots={{ toolbar: GridToolbar }}
      slotProps={{ toolbar: { showQuickFilter: true } }}
    />
  );
};
