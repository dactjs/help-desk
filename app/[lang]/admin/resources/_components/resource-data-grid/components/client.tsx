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

import { getShortUUID } from "@/utils/get-short-uuid";

import { updateResource } from "../actions/update";
import { deleteResource } from "../actions/delete";
import { Dictionary } from "../dictionaries";
import { Resource } from "../schemas/resource";

export interface ClientResourceDataGridProps {
  resources: Resource[];
  dictionary: Dictionary;
}

export const ClientResourceDataGrid: React.FC<ClientResourceDataGridProps> = ({
  resources,
  dictionary,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const confirm = useConfirm();

  const handleDelete = (id: string) => {
    confirm()
      .then(async () => {
        try {
          await deleteResource(id);
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

  const columns: GridColDef<Resource>[] = [
    {
      type: "actions",
      field: "actions",
      headerName: dictionary.actions,
      getActions: (params: GridRowParams) => [
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
      editable: true,
      field: "brand",
      headerName: dictionary.brand,
      headerAlign: "center",
      align: "center",
      minWidth: 175,
    },
    {
      editable: true,
      field: "model",
      headerName: dictionary.model,
      headerAlign: "center",
      align: "center",
      minWidth: 175,
    },
    {
      editable: true,
      field: "serial",
      headerName: dictionary.serial,
      headerAlign: "center",
      align: "center",
      minWidth: 225,
    },
    {
      field: "assignedTo",
      headerName: dictionary.assignedTo,
      headerAlign: "center",
      align: "center",
      minWidth: 225,
      valueGetter: (value: Resource["assignedTo"]) => value?.name ?? "--",
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

  const handleOnProcessRowUpdateError = (error: unknown) => {
    if (error instanceof Error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        style: { whiteSpace: "pre-line" },
      });
    }
  };

  return (
    <DataGrid
      disableRowSelectionOnClick
      columns={columns}
      rows={resources}
      slots={{ toolbar: GridToolbar }}
      slotProps={{ toolbar: { showQuickFilter: true } }}
      processRowUpdate={updateResource}
      onProcessRowUpdateError={handleOnProcessRowUpdateError}
    />
  );
};
