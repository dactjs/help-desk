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
import { useSnackbar } from "notistack";
import { subject } from "@casl/ability";
import { ResourceStatus } from "@prisma/client";

import { useAppAbility } from "@/auth/ability";
import { ResourceActionDialog } from "@/features/resources/resource-action-dialog";
import { ResourceActionDialogType } from "@/features/resources/resource-action-dialog/types";
import { Dictionary } from "@/internationalization/dictionaries/resources";
import { SupportedLanguage } from "@/internationalization/types";
import { getShortUUID } from "@/utils/get-short-uuid";

import { updateResource } from "./actions/update";
import { Resource } from "./types";

export interface ClientResourceDataGridProps {
  resources: Resource[];
  language: SupportedLanguage;
  dictionary: Pick<
    Dictionary,
    "resource_model" | "resource_data_grid" | "resource_action_dialog"
  >;
}

export function ClientResourceDataGrid({
  resources,
  language,
  dictionary: { resource_model, resource_data_grid, resource_action_dialog },
}: ClientResourceDataGridProps) {
  const router = useRouter();

  const ability = useAppAbility();

  const { enqueueSnackbar } = useSnackbar();

  const [action, setAction] = useState<{
    type: ResourceActionDialogType;
    resourceId: string;
    origin: Resource["assignedTo"];
  } | null>(null);

  const status: Record<ResourceStatus, string> = {
    UNASSIGNED: resource_model["status--unassigned"],
    ASSIGNED: resource_model["status--assigned"],
    REPAIR_IN_PROGRESS: resource_model["status--repair-in-progress"],
    DISCARDED: resource_model["status--discarded"],
  };

  const columns: GridColDef<Resource>[] = [
    {
      type: "actions",
      field: "actions",
      headerName: resource_data_grid.actions,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={`${params.id}-view-details`}
          disabled={!ability.can("read", subject("Resource", params.row))}
          icon={<LaunchIcon />}
          label={resource_data_grid["actions--view-details"]}
          aria-label={resource_data_grid["actions--view-details"]}
          onClick={() =>
            router.push(`/${language}/technicians/resources/${params.row.id}`)
          }
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
      editable: ability.can("update", "Resource", "brand"),
      field: "brand",
      headerName: resource_model.brand,
      headerAlign: "center",
      align: "center",
      minWidth: 175,
    },
    {
      editable: ability.can("update", "Resource", "model"),
      field: "model",
      headerName: resource_model.model,
      headerAlign: "center",
      align: "center",
      minWidth: 175,
    },
    {
      editable: ability.can("update", "Resource", "serial"),
      field: "serial",
      headerName: resource_model.serial,
      headerAlign: "center",
      align: "center",
      minWidth: 225,
    },
    {
      field: "status",
      headerName: resource_model.status,
      headerAlign: "center",
      align: "center",
      width: 175,
      renderCell: (params) => {
        const colors: Record<ResourceStatus, ChipProps["color"]> = {
          UNASSIGNED: "default",
          ASSIGNED: "info",
          REPAIR_IN_PROGRESS: "warning",
          DISCARDED: "error",
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
    <>
      {action && (
        <ResourceActionDialog
          fullWidth
          type={action.type}
          resourceId={action.resourceId}
          origin={action.origin}
          dictionary={{ resource_action_dialog }}
          open={Boolean(action)}
          close={() => setAction(null)}
        />
      )}

      <DataGrid
        disableRowSelectionOnClick
        columns={columns}
        rows={resources}
        slots={{ toolbar: GridToolbar }}
        slotProps={{ toolbar: { showQuickFilter: true } }}
        processRowUpdate={updateResource}
        onProcessRowUpdateError={handleOnProcessRowUpdateError}
      />
    </>
  );
}
