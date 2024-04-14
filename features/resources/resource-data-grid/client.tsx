"use client";

import { useRouter } from "next/navigation";
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import LaunchIcon from "@mui/icons-material/Launch";
import AssignIcon from "@mui/icons-material/Assignment";
import TransferIcon from "@mui/icons-material/SwapHoriz";
import UnassignIcon from "@mui/icons-material/AssignmentReturn";
import RepairIcon from "@mui/icons-material/Hardware";
import OutputIcon from "@mui/icons-material/Output";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import { useConfirm } from "material-ui-confirm";

import { Dictionary } from "@/internationalization/dictionaries/resources";
import { SupportedLanguage } from "@/internationalization/types";
import { getShortUUID } from "@/utils/get-short-uuid";

import { updateResource } from "./actions/update";
import { deleteResource } from "./actions/delete";
import { Resource } from "./types";

export type ClientResourceDataGridDictionary = Pick<
  Dictionary,
  "resource_model" | "resource_data_grid"
>;

export interface ClientResourceDataGridProps {
  resources: Resource[];
  language: SupportedLanguage;
  dictionary: ClientResourceDataGridDictionary;
}

export const ClientResourceDataGrid: React.FC<ClientResourceDataGridProps> = ({
  resources,
  language,
  dictionary: { resource_model, resource_data_grid },
}) => {
  const router = useRouter();

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
      headerName: resource_data_grid.actions,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={`${params.id}-view-details`}
          icon={<LaunchIcon />}
          label={resource_data_grid["actions--view-details"]}
          aria-label={resource_data_grid["actions--view-details"]}
          onClick={() =>
            router.push(`/${language}/admin/resources/${params.row.id}`)
          }
        />,
        <GridActionsCellItem
          key={`${params.id}-assign`}
          showInMenu
          icon={<AssignIcon color="success" />}
          label={resource_data_grid["actions--assign"]}
          aria-label={resource_data_grid["actions--assign"]}
        />,
        <GridActionsCellItem
          key={`${params.id}-transfer`}
          showInMenu
          icon={<TransferIcon color="info" />}
          label={resource_data_grid["actions--transfer"]}
          aria-label={resource_data_grid["actions--transfer"]}
        />,
        <GridActionsCellItem
          key={`${params.id}-unassign`}
          showInMenu
          icon={<UnassignIcon color="action" />}
          label={resource_data_grid["actions--unassign"]}
          aria-label={resource_data_grid["actions--unassign"]}
        />,
        <GridActionsCellItem
          key={`${params.id}-repair`}
          showInMenu
          icon={<RepairIcon color="disabled" />}
          label={resource_data_grid["actions--repair"]}
          aria-label={resource_data_grid["actions--repair"]}
        />,
        <GridActionsCellItem
          key={`${params.id}-output`}
          showInMenu
          icon={<OutputIcon color="warning" />}
          label={resource_data_grid["actions--output"]}
          aria-label={resource_data_grid["actions--output"]}
        />,
        <GridActionsCellItem
          key={`${params.id}-delete`}
          showInMenu
          icon={<DeleteIcon color="error" />}
          label={resource_data_grid["actions--delete"]}
          aria-label={resource_data_grid["actions--delete"]}
          onClick={() => handleDelete(params.row.id)}
        />,
      ],
    },
    {
      field: "id",
      headerName: resource_model.id,
      headerAlign: "center",
      align: "center",
      width: 75,
      valueGetter: (value) => getShortUUID(value),
    },
    {
      editable: true,
      field: "brand",
      headerName: resource_model.brand,
      headerAlign: "center",
      align: "center",
      minWidth: 175,
    },
    {
      editable: true,
      field: "model",
      headerName: resource_model.model,
      headerAlign: "center",
      align: "center",
      minWidth: 175,
    },
    {
      editable: true,
      field: "serial",
      headerName: resource_model.serial,
      headerAlign: "center",
      align: "center",
      minWidth: 225,
    },
    {
      field: "assignedTo",
      headerName: resource_model.assignedTo,
      headerAlign: "center",
      align: "center",
      minWidth: 225,
      valueGetter: (value: Resource["assignedTo"]) => value?.name ?? "--",
    },
    {
      type: "dateTime",
      field: "createdAt",
      headerName: resource_model.createdAt,
      headerAlign: "center",
      align: "center",
      minWidth: 180,
    },
    {
      type: "dateTime",
      field: "updatedAt",
      headerName: resource_model.updatedAt,
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
