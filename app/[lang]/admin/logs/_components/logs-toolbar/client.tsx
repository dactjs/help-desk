"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { subDays } from "date-fns/subDays";
import { differenceInDays } from "date-fns/differenceInDays";

import { Dictionary } from "@/internationalization/dictionaries/logs";

import { ParamsSchema } from "../../_schemas";

export interface ClientLogsToolbarProps {
  dictionary: Pick<Dictionary, "logs_toolbar">;
}

export function ClientLogsToolbar({
  dictionary: { logs_toolbar },
}: ClientLogsToolbarProps) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const result = ParamsSchema.safeParse(Object.fromEntries(params));

  const start = result.data?.start || new Date();
  const end = result.data?.end || new Date();

  const filters = [
    {
      value: [new Date(), new Date()],
      text: logs_toolbar["filter--today"],
      disabled: differenceInDays(end, start) === 0,
    },
    {
      value: [subDays(new Date(), 7), new Date()],
      text: logs_toolbar["filter--last-week"],
      disabled: differenceInDays(end, start) === 7,
    },
    {
      value: [subDays(new Date(), 30), new Date()],
      text: logs_toolbar["filter--last-month"],
      disabled: differenceInDays(end, start) === 30,
    },
  ];

  const handleOnClick = ([start, end]: Date[]) => {
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
    </ButtonGroup>
  );
}
