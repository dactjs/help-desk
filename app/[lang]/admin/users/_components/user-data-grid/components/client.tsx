"use client";

import Chip, { ChipProps } from "@mui/material/Chip";
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import { UserStatus, UserRole } from "@prisma/client";

import { getShortUUID } from "@/utils/get-short-uuid";

import { updateUser } from "../actions/update";
import { deleteUser } from "../actions/delete";
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

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
    } catch (error) {
      if (error instanceof Error) {
        enqueueSnackbar(error.message, {
          variant: "error",
          style: { whiteSpace: "pre-line" },
        });
      }
    }
  };

  const columns: GridColDef<User>[] = [
    {
      type: "actions",
      field: "actions",
      headerName: dictionary.actions,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={`${params.id}-delete`}
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
          ADMIN: "warning",
          TECHNICIAN: "info",
          USER: "success",
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
      processRowUpdate={updateUser}
      onProcessRowUpdateError={handleOnProcessRowUpdateError}
    />
  );
};
