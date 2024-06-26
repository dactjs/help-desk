"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Stack from "@mui/material/Stack";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { startOfMonth } from "date-fns/startOfMonth";
import { endOfMonth } from "date-fns/endOfMonth";
import { subMonths } from "date-fns/subMonths";
import { differenceInMonths } from "date-fns/differenceInMonths";

import { Dictionary } from "@/internationalization/dictionaries/performance";

import { ParamsSchema } from "../../_schemas";

import { CustomFilter } from "./components/custom-filter";
import { TechnicianFilter } from "./components/technician-filter";

export interface ClientIndividualPerformanceToolbarProps {
  dictionary: Pick<Dictionary, "individual_performance_toolbar">;
}

export function ClientIndividualPerformanceToolbar({
  dictionary: { individual_performance_toolbar },
}: ClientIndividualPerformanceToolbarProps) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const result = ParamsSchema.safeParse(Object.fromEntries(params));

  const start = result.data?.start || new Date();
  const end = result.data?.end || new Date();

  const filters = [
    {
      value: [startOfMonth(new Date()), endOfMonth(new Date())],
      text: individual_performance_toolbar["filter--current-month"],
      disabled: differenceInMonths(end, start) === 0 && !params.has("custom"),
    },
    {
      value: [subMonths(new Date(), 3), new Date()],
      text: individual_performance_toolbar["filter--last-3-month"],
      disabled: differenceInMonths(end, start) === 3 && !params.has("custom"),
    },
    {
      value: [subMonths(new Date(), 6), new Date()],
      text: individual_performance_toolbar["filter--last-6-month"],
      disabled: differenceInMonths(end, start) === 6 && !params.has("custom"),
    },
  ];

  const handleOnClick = ([start, end]: Date[]) => {
    params.delete("custom");

    params.set("start", start.toISOString());
    params.set("end", end.toISOString());

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      alignItems="center"
      spacing={1}
      useFlexGap
    >
      <ButtonGroup variant="outlined" size="small" color="inherit">
        {filters.map(({ value, text, disabled }) => (
          <Button
            key={text}
            disabled={disabled}
            onClick={() => handleOnClick(value)}
          >
            {text}
          </Button>
        ))}

        <CustomFilter
          dictionary={individual_performance_toolbar["filter--custom"]}
        />
      </ButtonGroup>

      <TechnicianFilter
        label={individual_performance_toolbar.technician_field_label}
      />
    </Stack>
  );
}
