"use client";

import {
  Paper,
  Stack,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import {
  AddCircle as AddIcon,
  Input as ReceptionIcon,
  AssignmentInd as AssignmentIcon,
  SwapHoriz as TransferIcon,
  HourglassBottom as OpenedIcon,
  CheckCircle as ResolvedIcon,
  Verified as ClosedIcon,
  Cancel as CancelledIcon,
} from "@mui/icons-material";
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
} from "@mui/lab";
import { TicketTrace, TicketTraceType } from "@prisma/client";

export interface ClientTicketTraceTimelineProps {
  traces: TicketTrace[];
}

export function ClientTicketTraceTimeline({
  traces,
}: ClientTicketTraceTimelineProps): React.ReactElement {
  const icons: Record<TicketTraceType, React.ReactElement> = {
    [TicketTraceType.RECEPTION]: <ReceptionIcon color="success" />,
    [TicketTraceType.ASSIGNMENT]: <AssignmentIcon color="warning" />,
    [TicketTraceType.TRANSFER]: <TransferIcon color="info" />,
    [TicketTraceType.OPENED]: <OpenedIcon color="disabled" />,
    [TicketTraceType.RESOLVED]: <ResolvedIcon color="action" />,
    [TicketTraceType.CLOSED]: <ClosedIcon color="success" />,
    [TicketTraceType.CANCELLED]: <CancelledIcon color="error" />,
  };

  return (
    <Paper sx={{ height: "100%" }}>
      <AppBar position="static" sx={{ borderRadius: "inherit" }}>
        <Stack
          component={Toolbar}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography fontWeight="bolder">Trazabilidad</Typography>

          <IconButton size="small">
            <AddIcon />
          </IconButton>
        </Stack>
      </AppBar>

      <Stack sx={{ height: "calc(100% - 64px)", overflowY: "auto" }}>
        <Timeline>
          {traces.map((trace) => (
            <TimelineItem key={trace.id}>
              <TimelineOppositeContent>
                <Typography fontWeight="bolder">{trace.type}</Typography>

                <Typography variant="caption" color="text.secondary">
                  {new Date(trace.createdAt).toLocaleString("es-do")}
                </Typography>
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineConnector />

                <TimelineDot variant="outlined">
                  <IconButton size="small">{icons[trace.type]}</IconButton>
                </TimelineDot>

                <TimelineConnector />
              </TimelineSeparator>

              <TimelineContent sx={{ paddingX: 2, paddingY: 1.5 }}>
                <Typography fontWeight="bolder">Realizado por:</Typography>

                <Typography variant="caption" color="text.secondary">
                  Manuel Brioso
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Stack>
    </Paper>
  );
}
