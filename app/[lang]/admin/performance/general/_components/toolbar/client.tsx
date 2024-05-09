"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { startOfMonth } from "date-fns/startOfMonth";
import { endOfMonth } from "date-fns/endOfMonth";
import { subMonths } from "date-fns/subMonths";
import { differenceInMonths } from "date-fns/differenceInMonths";

import { Dictionary } from "@/internationalization/dictionaries/performance";

import { ParamsSchema } from "../../_schemas";

import { CustomFilter } from "./components/custom-filter";

export interface ClientGeneralPerformanceToolbarProps {
  dictionary: Pick<Dictionary, "general_performance_toolbar">;
}

export function ClientGeneralPerformanceToolbar({
  dictionary: { general_performance_toolbar },
}: ClientGeneralPerformanceToolbarProps) {
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
      text: general_performance_toolbar["filter--current-month"],
      disabled: differenceInMonths(end, start) === 0 && !params.has("custom"),
    },
    {
      value: [subMonths(new Date(), 3), new Date()],
      text: general_performance_toolbar["filter--last-3-month"],
      disabled: differenceInMonths(end, start) === 3 && !params.has("custom"),
    },
    {
      value: [subMonths(new Date(), 6), new Date()],
      text: general_performance_toolbar["filter--last-6-month"],
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
        dictionary={general_performance_toolbar["filter--custom"]}
      />
    </ButtonGroup>
  );
}
