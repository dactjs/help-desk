"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Tooltip from "@mui/material/Tooltip";
import UnassignedIcon from "@mui/icons-material/AssignmentLate";
import AssignedIcon from "@mui/icons-material/AssignmentInd";
import InProgressIcon from "@mui/icons-material/HourglassBottom";
import ResolvedIcon from "@mui/icons-material/CheckCircle";
import ClosedIcon from "@mui/icons-material/Verified";
import CancelledIcon from "@mui/icons-material/Cancel";
import { TicketStatus } from "@prisma/client";

import { Dictionary } from "@/internationalization/dictionaries/tickets";

import { ParamsSchema } from "../schemas";

export interface StatusFilterProps {
  dictionary: Pick<Dictionary, "ticket_model">;
}

export function StatusFilter({
  dictionary: { ticket_model },
}: StatusFilterProps) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const result = ParamsSchema.safeParse(Object.fromEntries(params));

  const status = result.data?.status || [];

  const filters = [
    {
      value: TicketStatus.UNASSIGNED,
      tooltip: ticket_model["status--unassigned"],
      icon: <UnassignedIcon />,
    },
    {
      value: TicketStatus.ASSIGNED,
      tooltip: ticket_model["status--assigned"],
      icon: <AssignedIcon />,
    },
    {
      value: TicketStatus.IN_PROGRESS,
      tooltip: ticket_model["status--in-progress"],
      icon: <InProgressIcon />,
    },
    {
      value: TicketStatus.RESOLVED,
      tooltip: ticket_model["status--resolved"],
      icon: <ResolvedIcon />,
    },
    {
      value: TicketStatus.CLOSED,
      tooltip: ticket_model["status--closed"],
      icon: <ClosedIcon />,
    },
    {
      value: TicketStatus.CANCELLED,
      tooltip: ticket_model["status--cancelled"],
      icon: <CancelledIcon />,
    },
  ];

  const handleOnChange = (
    _: React.MouseEvent<HTMLElement, MouseEvent>,
    value: string[]
  ) => {
    params.delete("page");
    params.delete("pageSize");

    if (Array.isArray(value) && value.length > 0) {
      params.set("status", JSON.stringify(value));
    } else {
      params.delete("status");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <ToggleButtonGroup size="small" value={status} onChange={handleOnChange}>
      {filters.map(({ value, tooltip, icon }) => (
        <Tooltip key={value} arrow title={tooltip}>
          <ToggleButton value={value}>{icon}</ToggleButton>
        </Tooltip>
      ))}
    </ToggleButtonGroup>
  );
}
