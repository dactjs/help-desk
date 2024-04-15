"use client";

import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import { useConfirm } from "material-ui-confirm";

import { Dictionary } from "@/internationalization/dictionaries/tickets";
import { getShortUUID } from "@/utils/get-short-uuid";

import { deleteTicketService } from "./actions/delete";
import { TicketService } from "./types";

export type ClientTicketServiceDataGridDictionary = Pick<
  Dictionary,
  "ticket_service_model" | "ticket_service_data_grid"
>;

export interface ClientTicketServiceDataGridProps {
  services: TicketService[];
  dictionary: ClientTicketServiceDataGridDictionary;
}

export const ClientTicketServiceDataGrid: React.FC<
  ClientTicketServiceDataGridProps
> = ({
  services,
  dictionary: { ticket_service_model, ticket_service_data_grid },
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const confirm = useConfirm();

  const handleDelete = (id: string) => {
    confirm()
      .then(async () => {
        try {
          await deleteTicketService(id);
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

  const columns: GridColDef<TicketService>[] = [
    {
      type: "actions",
      field: "actions",
      headerName: ticket_service_data_grid.actions,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={`${params.id}-delete`}
          showInMenu
          icon={<DeleteIcon color="error" />}
          label={ticket_service_data_grid["actions--delete"]}
          aria-label={ticket_service_data_grid["actions--delete"]}
          onClick={() => handleDelete(params.row.id)}
        />,
      ],
    },
    {
      field: "id",
      headerName: ticket_service_model.id,
      headerAlign: "center",
      align: "center",
      width: 75,
      valueGetter: (value) => getShortUUID(value),
    },
    {
      field: "name",
      headerName: ticket_service_model.name,
      headerAlign: "center",
      align: "center",
      minWidth: 225,
    },
    {
      type: "dateTime",
      field: "createdAt",
      headerName: ticket_service_model.createdAt,
      headerAlign: "center",
      align: "center",
      minWidth: 180,
    },
    {
      type: "dateTime",
      field: "updatedAt",
      headerName: ticket_service_model.updatedAt,
      headerAlign: "center",
      align: "center",
      minWidth: 180,
    },
  ];

  return (
    <DataGrid
      disableRowSelectionOnClick
      columns={columns}
      rows={services}
      slots={{ toolbar: GridToolbar }}
      slotProps={{ toolbar: { showQuickFilter: true } }}
    />
  );
};
