"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import TechnicianIcon from "@mui/icons-material/SupportAgent";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { UserRole } from "@prisma/client";

import { UserAutocomplete } from "@/features/users/user-autocomplete";
import { User } from "@/features/users/user-autocomplete/types";

import { ParamsSchema } from "../../../../_schemas";

export interface TechnicianFilterProps {
  label: string;
}

export function TechnicianFilter({ label }: TechnicianFilterProps) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const params = new URLSearchParams(searchParams);

  const result = ParamsSchema.safeParse(Object.fromEntries(params));

  const [technician, setTechnician] = useState<User | null>(
    result.data?.technician || null
  );

  const handleOnClose = () => {
    setAnchorEl(null);

    params.delete("page");
    params.delete("pageSize");

    if (technician) {
      params.set("technician", JSON.stringify(technician));
    } else {
      params.delete("technician");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Tooltip arrow title={label}>
        <Badge
          variant="dot"
          badgeContent={params.has("technician") || 0}
          color="info"
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <ToggleButton
            size="small"
            value="technician"
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <TechnicianIcon />
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
            fullWidth
            filters={{ roles: [UserRole.TECHNICIAN] }}
            value={technician}
            onChange={(_, value) => setTechnician(value as User | null)}
            label={label}
          />
        </Box>
      </Popover>
    </>
  );
}
