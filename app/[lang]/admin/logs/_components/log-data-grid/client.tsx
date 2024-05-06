"use client";

import { useState } from "react";
import {
  DataGrid,
  GridToolbar,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { subject } from "@casl/ability";

import { useAppAbility } from "@/auth/ability";
import { Dictionary } from "@/internationalization/dictionaries/logs";
import { SupportedLanguage } from "@/internationalization/types";

import { LogDetailsDialog } from "./components/log-details-dialog";
import { Log } from "./types";

export interface ClientLogDataGridProps {
  logs: Log[];
  language: SupportedLanguage;
  dictionary: Pick<Dictionary, "log" | "log_data_grid" | "log_details_dialog">;
}

export function ClientLogDataGrid({
  logs,
  language,
  dictionary: { log, log_data_grid, log_details_dialog },
}: ClientLogDataGridProps) {
  const ability = useAppAbility();

  const [details, setDetails] = useState<Log | null>(null);

  const columns: GridColDef<Log>[] = [
    {
      type: "actions",
      field: "actions",
      headerName: log_data_grid.actions,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={`${params.id}-view-details`}
          disabled={!ability.can("read", subject("Log", params.row))}
          icon={<VisibilityIcon />}
          label={log_data_grid["actions--view-details"]}
          aria-label={log_data_grid["actions--view-details"]}
          onClick={() => setDetails(params.row)}
        />,
      ],
    },
    {
      field: "model",
      headerName: log.model,
      headerAlign: "center",
      align: "center",
      flex: 1,
      width: 150,
    },
    {
      field: "operation",
      headerName: log.operation,
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "user",
      headerName: log.user,
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 225,
      valueGetter: (value: Log["user"]) => value.name,
    },
    {
      type: "dateTime",
      field: "timestamp",
      headerName: log.timestamp,
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 180,
    },
  ];

  return (
    <>
      {details && (
        <LogDetailsDialog
          fullWidth
          log={details}
          language={language}
          dictionary={{ log, log_details_dialog }}
          open={Boolean(details)}
          onClose={() => setDetails(null)}
        />
      )}

      <DataGrid
        disableRowSelectionOnClick
        columns={columns}
        rows={logs}
        slots={{ toolbar: GridToolbar }}
        slotProps={{ toolbar: { showQuickFilter: true } }}
      />
    </>
  );
}
