"use client";

import Chip, { ChipProps } from "@mui/material/Chip";
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import AssignIcon from "@mui/icons-material/AssignmentInd";
import TransferIcon from "@mui/icons-material/SwapHoriz";
import OpenIcon from "@mui/icons-material/HourglassBottom";
import ResolveIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Verified";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import { useConfirm } from "material-ui-confirm";
import { TicketStatus } from "@prisma/client";

import { getShortUUID } from "@/utils/get-short-uuid";

import { deleteTicket } from "../actions/delete";
import { Dictionary } from "../dictionaries";
import { Ticket } from "../types";

export interface ClientTicketDataGridProps {
  tickets: Ticket[];
  dictionary: Dictionary;
}

export const ClientTicketDataGrid: React.FC<ClientTicketDataGridProps> = ({
  tickets,
  dictionary,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const confirm = useConfirm();

  const handleDelete = (id: string) => {
    confirm()
      .then(async () => {
        try {
          await deleteTicket(id);
        } catch (error) {
          if (error instanceof Error) {
            enqueueSnackbar(error.message, {
              variant: "error",
              style: { whiteSpace: "pre-line" },
            });
          }
        }
      })
      .catch(() => null);
  };

  const columns: GridColDef<Ticket>[] = [
    {
      type: "actions",
      field: "actions",
      headerName: dictionary.actions,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={`${params.id}-assign`}
          showInMenu
          icon={<AssignIcon color="warning" />}
          label={dictionary["actions--assign"]}
          aria-label={dictionary["actions--assign"]}
        />,
        <GridActionsCellItem
          key={`${params.id}-transfer`}
          showInMenu
          icon={<TransferIcon color="info" />}
          label={dictionary["actions--transfer"]}
          aria-label={dictionary["actions--transfer"]}
        />,
        <GridActionsCellItem
          key={`${params.id}-open`}
          showInMenu
          icon={<OpenIcon color="disabled" />}
          label={dictionary["actions--open"]}
          aria-label={dictionary["actions--open"]}
        />,
        <GridActionsCellItem
          key={`${params.id}-resolve`}
          showInMenu
          icon={<ResolveIcon color="action" />}
          label={dictionary["actions--resolve"]}
          aria-label={dictionary["actions--resolve"]}
        />,
        <GridActionsCellItem
          key={`${params.id}-close`}
          showInMenu
          icon={<CloseIcon color="success" />}
          label={dictionary["actions--close"]}
          aria-label={dictionary["actions--close"]}
        />,
        <GridActionsCellItem
          key={`${params.id}-cancel`}
          showInMenu
          icon={<CancelIcon color="error" />}
          label={dictionary["actions--cancel"]}
          aria-label={dictionary["actions--cancel"]}
        />,
        <GridActionsCellItem
          key={`${params.id}-delete`}
          showInMenu
          icon={<DeleteIcon color="error" />}
          label={dictionary["actions--delete"]}
          aria-label={dictionary["actions--delete"]}
          onClick={() => handleDelete(params.row.id)}
        />,
      ],
    },
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
