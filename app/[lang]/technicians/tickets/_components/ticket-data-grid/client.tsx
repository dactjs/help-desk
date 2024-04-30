"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Chip, { ChipProps } from "@mui/material/Chip";
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import LaunchIcon from "@mui/icons-material/Launch";
import AssignIcon from "@mui/icons-material/AssignmentInd";
import OpenIcon from "@mui/icons-material/HourglassBottom";
import ResolveIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { subject } from "@casl/ability";
import { TicketStatus } from "@prisma/client";

import { useAppAbility } from "@/auth/ability";
import { TicketActionDialog } from "@/features/tickets/ticket-action-dialog";
import { TicketActionDialogType } from "@/features/tickets/ticket-action-dialog/types";
import { Dictionary } from "@/internationalization/dictionaries/tickets";
import { SupportedLanguage } from "@/internationalization/types";
import { getShortUUID } from "@/utils/get-short-uuid";

import { Ticket } from "./types";

export interface ClientTicketDataGridProps {
  tickets: Ticket[];
  language: SupportedLanguage;
  dictionary: Pick<
    Dictionary,
    "ticket_model" | "ticket_data_grid" | "ticket_action_dialog"
  >;
}

export function ClientTicketDataGrid({
  tickets,
  language,
  dictionary: { ticket_model, ticket_data_grid, ticket_action_dialog },
}: ClientTicketDataGridProps) {
  const router = useRouter();

  const ability = useAppAbility();

  const [action, setAction] = useState<{
    type: TicketActionDialogType;
    ticketId: string;
    origin: Ticket["assignedTo"];
  } | null>(null);

  const status: Record<TicketStatus, string> = {
    UNASSIGNED: ticket_model["status--unassigned"],
    ASSIGNED: ticket_model["status--assigned"],
    IN_PROGRESS: ticket_model["status--in-progress"],
    RESOLVED: ticket_model["status--resolved"],
    CLOSED: ticket_model["status--closed"],
    CANCELLED: ticket_model["status--cancelled"],
  };

  const columns: GridColDef<Ticket>[] = [
    {
      type: "actions",
      field: "actions",
      headerName: ticket_data_grid.actions,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={`${params.id}-view-details`}
          disabled={!ability.can("read", subject("Ticket", params.row))}
          icon={<LaunchIcon />}
          label={ticket_data_grid["actions--view-details"]}
          aria-label={ticket_data_grid["actions--view-details"]}
          onClick={() =>
            router.push(`/${language}/technicians/tickets/${params.row.id}`)
          }
        />,
        <GridActionsCellItem
          key={`${params.id}-take`}
          showInMenu
          disabled={!ability.can("take", subject("Ticket", params.row))}
          icon={<AssignIcon color="warning" />}
          label={ticket_data_grid["actions--take"]}
          aria-label={ticket_data_grid["actions--take"]}
          onClick={() =>
            setAction({
              type: TicketActionDialogType.TAKE,
              ticketId: params.row.id,
              origin: params.row.assignedTo,
            })
          }
        />,
        <GridActionsCellItem
          key={`${params.id}-open`}
          showInMenu
          disabled={!ability.can("open", subject("Ticket", params.row))}
          icon={<OpenIcon color="disabled" />}
          label={ticket_data_grid["actions--open"]}
          aria-label={ticket_data_grid["actions--open"]}
          onClick={() =>
            setAction({
              type: TicketActionDialogType.OPEN,
              ticketId: params.row.id,
              origin: params.row.assignedTo,
            })
          }
        />,
        <GridActionsCellItem
          key={`${params.id}-resolve`}
          showInMenu
          disabled={!ability.can("resolve", subject("Ticket", params.row))}
          icon={<ResolveIcon color="action" />}
          label={ticket_data_grid["actions--resolve"]}
          aria-label={ticket_data_grid["actions--resolve"]}
          onClick={() =>
            setAction({
              type: TicketActionDialogType.RESOLVE,
              ticketId: params.row.id,
              origin: params.row.assignedTo,
            })
          }
        />,
        <GridActionsCellItem
          key={`${params.id}-cancel`}
          showInMenu
          disabled={!ability.can("cancel", subject("Ticket", params.row))}
          icon={<CancelIcon color="error" />}
          label={ticket_data_grid["actions--cancel"]}
          aria-label={ticket_data_grid["actions--cancel"]}
          onClick={() =>
            setAction({
              type: TicketActionDialogType.CANCEL,
              ticketId: params.row.id,
              origin: params.row.assignedTo,
            })
          }
        />,
      ],
    },
    {
      field: "id",
      headerName: ticket_model.id,
      headerAlign: "center",
      align: "center",
      width: 75,
      valueGetter: (value) => getShortUUID(value),
    },
    {
      field: "service",
      headerName: ticket_model.service,
      headerAlign: "center",
      align: "center",
      minWidth: 225,
      valueGetter: (value: Ticket["service"]) => value.name,
    },
    {
      field: "status",
      headerName: ticket_model.status,
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: (params) => {
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
            label={status[params.row.status] ?? "???"}
            color={colors[params.row.status] ?? "default"}
          />
        );
      },
    },
    {
      field: "sentBy",
      headerName: ticket_model.sentBy,
      headerAlign: "center",
      align: "center",
      minWidth: 225,
      valueGetter: (value: Ticket["sentBy"]) => value.name,
    },
    {
      field: "assignedTo",
      headerName: ticket_model.assignedTo,
      headerAlign: "center",
      align: "center",
      minWidth: 225,
      valueGetter: (value: Ticket["assignedTo"]) => value?.name ?? "--",
    },
    {
      type: "dateTime",
      field: "createdAt",
      headerName: ticket_model.createdAt,
      headerAlign: "center",
      align: "center",
      minWidth: 180,
    },
    {
      type: "dateTime",
      field: "updatedAt",
      headerName: ticket_model.updatedAt,
      headerAlign: "center",
      align: "center",
      minWidth: 180,
    },
  ];

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
          close={() => setAction(null)}
        />
      )}

      <DataGrid
        disableRowSelectionOnClick
        columns={columns}
        rows={tickets}
        slots={{ toolbar: GridToolbar }}
        slotProps={{ toolbar: { showQuickFilter: true } }}
      />
    </>
  );
}
