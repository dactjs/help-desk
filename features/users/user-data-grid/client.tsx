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
import SyncLockIcon from "@mui/icons-material/SyncLock";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import { useConfirm } from "material-ui-confirm";
import { subject } from "@casl/ability";
import { UserStatus, UserRole } from "@prisma/client";

import { useAppAbility } from "@/auth/ability";
import { UserActionDialog } from "@/features/users/user-action-dialog";
import { UserActionDialogType } from "@/features/users/user-action-dialog/types";
import { Dictionary } from "@/internationalization/dictionaries/users";
import { SupportedLanguage } from "@/internationalization/types";
import { getShortUUID } from "@/utils/get-short-uuid";

import { updateUser } from "./actions/update";
import { deleteUser } from "./actions/delete";
import { User } from "./types";

export interface ClientUserDataGridProps {
  users: User[];
  language: SupportedLanguage;
  dictionary: Pick<
    Dictionary,
    "user_model" | "user_data_grid" | "user_action_dialog"
  >;
}

export function ClientUserDataGrid({
  users,
  language,
  dictionary: { user_model, user_data_grid, user_action_dialog },
}: ClientUserDataGridProps) {
  const router = useRouter();

  const ability = useAppAbility();

  const { enqueueSnackbar } = useSnackbar();

  const confirm = useConfirm();

  const [action, setAction] = useState<{
    type: UserActionDialogType;
    userId: string;
  } | null>(null);

  const status: Record<UserStatus, string> = {
    ENABLED: user_model["status--enabled"],
    DISABLED: user_model["status--disabled"],
  };

  const role: Record<UserRole, string> = {
    ADMIN: user_model["role--admin"],
    TECHNICIAN: user_model["role--technician"],
    USER: user_model["role--user"],
  };

  const handleDelete = (id: string) => {
    confirm()
      .then(async () => {
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
      })
      .catch(() => null);
  };

  const columns: GridColDef<User>[] = [
    {
      type: "actions",
      field: "actions",
      headerName: user_data_grid.actions,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={`${params.id}-view-details`}
          disabled={!ability.can("read", subject("User", params.row))}
          icon={<LaunchIcon />}
          label={user_data_grid["actions--view-details"]}
          aria-label={user_data_grid["actions--view-details"]}
          onClick={() =>
            router.push(`/${language}/admin/users/${params.row.id}`)
          }
        />,
        <GridActionsCellItem
          key={`${params.id}-reset-password`}
          showInMenu
          disabled={!ability.can("reset-password", subject("User", params.row))}
          icon={<SyncLockIcon />}
          label={user_data_grid["actions--reset-password"]}
          aria-label={user_data_grid["actions--reset-password"]}
          onClick={() =>
            setAction({
              type: UserActionDialogType.RESET_PASSWORD,
              userId: params.row.id,
            })
          }
        />,
        <GridActionsCellItem
          key={`${params.id}-delete`}
          showInMenu
          disabled={!ability.can("delete", subject("User", params.row))}
          icon={<DeleteIcon color="error" />}
          label={user_data_grid["actions--delete"]}
          aria-label={user_data_grid["actions--delete"]}
          onClick={() => handleDelete(params.row.id)}
        />,
      ],
    },
    {
      field: "id",
      headerName: user_model.id,
      headerAlign: "center",
      align: "center",
      width: 75,
      valueGetter: (value) => getShortUUID(value),
    },
    {
      editable: ability.can("update", "User", "username"),
      field: "username",
      headerName: user_model.username,
      headerAlign: "center",
      align: "center",
      minWidth: 150,
    },
    {
      editable: ability.can("update", "User", "email"),
      field: "email",
      headerName: user_model.email,
      headerAlign: "center",
      align: "center",
      minWidth: 225,
    },
    {
      editable: ability.can("update", "User", "name"),
      field: "name",
      headerName: user_model.name,
      headerAlign: "center",
      align: "center",
      minWidth: 225,
    },
    {
      editable: ability.can("update", "User", "status"),
      type: "singleSelect",
      valueOptions: [
        { value: UserStatus.ENABLED, label: status.ENABLED },
        { value: UserStatus.DISABLED, label: status.DISABLED },
      ],
      field: "status",
      headerName: user_model.status,
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: (params) => {
        const colors: Record<UserStatus, ChipProps["color"]> = {
          ENABLED: "success",
          DISABLED: "error",
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
      editable: ability.can("update", "User", "role"),
      type: "singleSelect",
      valueOptions: [
        { value: UserRole.ADMIN, label: role.ADMIN },
        { value: UserRole.TECHNICIAN, label: role.TECHNICIAN },
        { value: UserRole.USER, label: role.USER },
      ],
      field: "role",
      headerName: user_model.role,
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: (params) => {
        const colors: Record<UserRole, ChipProps["color"]> = {
          ADMIN: "warning",
          TECHNICIAN: "info",
          USER: "success",
        };

        return (
          <Chip
            variant="filled"
            label={role[params.row.role] ?? "???"}
            color={colors[params.row.role] ?? "default"}
          />
        );
      },
    },
    {
      type: "dateTime",
      field: "createdAt",
      headerName: user_model.createdAt,
      headerAlign: "center",
      align: "center",
      minWidth: 180,
    },
    {
      type: "dateTime",
      field: "updatedAt",
      headerName: user_model.updatedAt,
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
        <UserActionDialog
          fullWidth
          type={action.type}
          userId={action.userId}
          dictionary={{ user_action_dialog }}
          open={Boolean(action)}
          onClose={() => setAction(null)}
        />
      )}

      <DataGrid
        disableRowSelectionOnClick
        columns={columns}
        rows={users}
        slots={{ toolbar: GridToolbar }}
        slotProps={{ toolbar: { showQuickFilter: true } }}
        processRowUpdate={updateUser}
        onProcessRowUpdateError={handleOnProcessRowUpdateError}
      />
    </>
  );
}
