"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import UnassignedIcon from "@mui/icons-material/AssignmentLate";
import AssignedIcon from "@mui/icons-material/AssignmentInd";
import InProgressIcon from "@mui/icons-material/HourglassBottom";
import ResolvedIcon from "@mui/icons-material/CheckCircle";
import ClosedIcon from "@mui/icons-material/Verified";
import CancelledIcon from "@mui/icons-material/Cancel";
import { TicketStatus } from "@prisma/client";

import { ParamsSchema } from "../schemas";

export function StatusFilter() {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const result = ParamsSchema.safeParse(Object.fromEntries(params));

  const status = result.data?.status || [];

  const filters = [
    {
      value: TicketStatus.UNASSIGNED,
      icon: <UnassignedIcon />,
    },
    {
      value: TicketStatus.ASSIGNED,
      icon: <AssignedIcon />,
    },
    {
      value: TicketStatus.IN_PROGRESS,
      icon: <InProgressIcon />,
    },
    {
      value: TicketStatus.RESOLVED,
      icon: <ResolvedIcon />,
    },
    {
      value: TicketStatus.CLOSED,
      icon: <ClosedIcon />,
    },
    {
      value: TicketStatus.CANCELLED,
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
      {filters.map(({ value, icon }) => (
        <ToggleButton key={value} value={value}>
          {icon}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
