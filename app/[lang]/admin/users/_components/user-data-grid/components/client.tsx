"use client";

import Chip, { ChipProps } from "@mui/material/Chip";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { UserStatus, UserRole } from "@prisma/client";

import { getShortUUID } from "@/utils/get-short-uuid";

import { update } from "../actions/update";
import { Dictionary } from "../dictionaries";
import { User } from "../schemas/user";

export interface ClientUserDataGridProps {
  users: User[];
  dictionary: Dictionary;
}

export const ClientUserDataGrid: React.FC<ClientUserDataGridProps> = ({
  users,
  dictionary,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const columns: GridColDef<User>[] = [
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
      field: "username",
      headerName: dictionary.username,
      headerAlign: "center",
      align: "center",
      minWidth: 150,
    },
    {
      editable: true,
      field: "email",
      headerName: dictionary.email,
      headerAlign: "center",
      align: "center",
      minWidth: 225,
    },
    {
      editable: true,
      field: "name",
      headerName: dictionary.name,
      headerAlign: "center",
      align: "center",
      minWidth: 225,
    },
    {
      editable: true,
      type: "singleSelect",
      valueOptions: [UserStatus.ENABLED, UserStatus.DISABLED],
      field: "status",
      headerName: dictionary.status,
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: (params) => {
        const dict: Record<UserStatus, string> = {
          ENABLED: dictionary["status--enabled"],
          DISABLED: dictionary["status--disabled"],
        };

        const colors: Record<UserStatus, ChipProps["color"]> = {
          ENABLED: "success",
          DISABLED: "error",
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
      editable: true,
      type: "singleSelect",
      valueOptions: [UserRole.ADMIN, UserRole.TECHNICIAN, UserRole.USER],
      field: "role",
      headerName: dictionary.role,
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: (params) => {
        const dict: Record<UserRole, string> = {
          ADMIN: dictionary["role--admin"],
          TECHNICIAN: dictionary["role--technician"],
          USER: dictionary["role--user"],
        };

        const colors: Record<UserRole, ChipProps["color"]> = {
          ADMIN: "primary",
          TECHNICIAN: "secondary",
          USER: "default",
        };

        return (
          <Chip
            variant="filled"
            label={dict[params.row.role] ?? "???"}
            color={colors[params.row.role] ?? "default"}
          />
        );
      },
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
      rows={users}
      slots={{ toolbar: GridToolbar }}
      slotProps={{ toolbar: { showQuickFilter: true } }}
      processRowUpdate={update}
      onProcessRowUpdateError={handleOnProcessRowUpdateError}
    />
  );
};
