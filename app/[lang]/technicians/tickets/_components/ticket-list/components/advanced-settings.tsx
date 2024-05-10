"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import { debounce } from "@mui/material/utils";
import TuneIcon from "@mui/icons-material/Tune";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { ParamsSchema } from "../schemas";
import { DEFAULT_PAGINATION } from "../config";

export interface AdvancedSettingsProps {
  heading: string;
  page_size_field_label: string;
}

export function AdvancedSettings({
  heading,
  page_size_field_label,
}: AdvancedSettingsProps) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const params = new URLSearchParams(searchParams);

  const result = ParamsSchema.safeParse(Object.fromEntries(params));

  const pageSize = result.data?.pageSize || null;

  const handleOnChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      params.delete("page");
      params.delete("pageSize");

      if (event.target.value) {
        params.set("pageSize", event.target.value);
      } else {
        params.delete("pageSize");
      }

      router.replace(`${pathname}?${params.toString()}`);
    },
    400
  );

  return (
    <>
      <Tooltip arrow title={heading}>
        <Badge
          variant="dot"
          badgeContent={params.has("pageSize") || 0}
          color="info"
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <ToggleButton
            size="small"
            value="advanced-settings"
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <TuneIcon />
            <ArrowDropDownIcon />
          </ToggleButton>
        </Badge>
      </Tooltip>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        transformOrigin={{ horizontal: "right", vertical: "bottom" }}
        onClose={() => setAnchorEl(null)}
      >
        <Stack
          spacing={1}
          divider={<Divider flexItem />}
          sx={{ minWidth: 225, padding: 2 }}
        >
          <Typography component="h3" variant="subtitle1" fontWeight="bolder">
            {heading}
          </Typography>

          <TextField
            type="number"
            size="small"
            label={page_size_field_label}
            placeholder={String(DEFAULT_PAGINATION.PAGE_SIZE)}
            defaultValue={pageSize ?? ""}
            inputProps={{ min: 1, max: 100 }}
            onChange={handleOnChange}
          />
        </Stack>
      </Popover>
    </>
  );
}
