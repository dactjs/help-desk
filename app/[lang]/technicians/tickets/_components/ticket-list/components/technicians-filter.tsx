"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import TechniciansIcon from "@mui/icons-material/SupportAgent";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { UserRole } from "@prisma/client";

import {
  UserAutocomplete,
  UserAutocompleteProps,
} from "@/features/users/user-autocomplete";

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

  const result = ParamsSchema.safeParse(searchParams);

  const technicians = result.data?.technicians || [];

  const handleOnChange: UserAutocompleteProps["onChange"] = (_, value) => {
    params.delete("page");
    params.delete("pageSize");

    if (Array.isArray(value) && value.length > 0) {
      params.set("technicians", JSON.stringify(value));
    } else {
      params.delete("technicians");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
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

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        onClose={() => setAnchorEl(null)}
        sx={{ marginTop: 1 }}
      >
        <Box sx={{ width: 325, padding: 2 }}>
          <UserAutocomplete
            multiple
            fullWidth
            filters={{ roles: [UserRole.TECHNICIAN] }}
            value={technicians}
            onChange={handleOnChange}
            label={label}
          />
        </Box>
      </Popover>
    </>
  );
}
