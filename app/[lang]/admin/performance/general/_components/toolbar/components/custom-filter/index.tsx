"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { Dictionary } from "@/internationalization/dictionaries/performance";

import { ParamsSchema } from "../../../../_schemas";

export interface CustomFilterProps {
  dictionary: Pick<
    Dictionary,
    "general_performance_toolbar"
  >["general_performance_toolbar"]["filter--custom"];
}

export function CustomFilter({
  dictionary: { label, start_field_label, end_field_label, apply_button_text },
}: CustomFilterProps) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const params = new URLSearchParams(searchParams);

  const result = ParamsSchema.safeParse(Object.fromEntries(params));

  const [start, setStart] = useState<Date | null>(result.data?.start || null);
  const [end, setEnd] = useState<Date | null>(result.data?.end || null);

  const handleOnClick = () => {
    if (!start || !end) return;

    params.set("custom", "true");
    params.set("start", start.toISOString());
    params.set("end", end.toISOString());

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Badge
        variant="dot"
        badgeContent={params.has("custom") || 0}
        color="info"
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Button onClick={(event) => setAnchorEl(event.currentTarget)}>
          {label}
        </Button>
      </Badge>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        onClose={() => setAnchorEl(null)}
        sx={{ marginTop: 1 }}
      >
        <Stack spacing={2} sx={{ width: 250, padding: 2 }}>
          <DateTimePicker
            shouldDisableDate={(day) => !!end && day >= end}
            label={start_field_label}
            value={start}
            onChange={setStart}
            slotProps={{
              field: { clearable: true },
              textField: { required: true, size: "small" },
            }}
          />

          <DateTimePicker
            shouldDisableDate={(day) => !!start && day <= start}
            label={end_field_label}
            value={end}
            onChange={setEnd}
            slotProps={{
              field: { clearable: true },
              textField: { required: true, size: "small" },
            }}
          />

          <Button disabled={!start || !end} onClick={handleOnClick}>
            {apply_button_text}
          </Button>
        </Stack>
      </Popover>
    </>
  );
}
