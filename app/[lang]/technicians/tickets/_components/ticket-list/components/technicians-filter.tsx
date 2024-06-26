"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import TechniciansIcon from "@mui/icons-material/SupportAgent";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { UserRole } from "@prisma/client";

import { UserAutocomplete } from "@/features/users/user-autocomplete";
import { User } from "@/features/users/user-autocomplete/types";

import { ParamsSchema } from "../schemas";

export interface TechniciansFilterProps {
  label: string;
}

export function TechniciansFilter({ label }: TechniciansFilterProps) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const params = new URLSearchParams(searchParams);

  const result = ParamsSchema.safeParse(Object.fromEntries(params));

  const [technicians, setTechnicians] = useState<User[]>(
    result.data?.technicians || []
  );

  const handleOnClose = () => {
    setAnchorEl(null);

    params.delete("page");
    params.delete("pageSize");

    if (technicians.length > 0) {
      params.set("technicians", JSON.stringify(technicians));
    } else {
      params.delete("technicians");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Tooltip arrow title={label}>
        <Badge
          color="info"
          badgeContent={technicians.length}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <ToggleButton
            size="small"
            value="technicians"
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <TechniciansIcon />
            <ArrowDropDownIcon />
          </ToggleButton>
        </Badge>
      </Tooltip>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        onClose={handleOnClose}
        sx={{ marginTop: 1 }}
      >
        <Box sx={{ minWidth: 250, padding: 2 }}>
          <UserAutocomplete
            multiple
            fullWidth
            filters={{ roles: [UserRole.TECHNICIAN] }}
            value={technicians}
            onChange={(_, value) => setTechnicians(value as User[])}
            label={label}
          />
        </Box>
      </Popover>
    </>
  );
}
