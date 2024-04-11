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
  Input as InputIcon,
  AssignmentInd as AssignmentIcon,
  SwapHoriz as TransferIcon,
  AssignmentReturn as UnassignmentIcon,
  Hardware as RepairIcon,
  Output as OutputIcon,
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
import { ResourceTrace, ResourceTraceType } from "@prisma/client";

interface ClientResourceTraceTimelineProps {
  traces: ResourceTrace[];
}

export function ClientResourceTraceTimeline({
  traces,
}: ClientResourceTraceTimelineProps): React.ReactElement {
  const icons: Record<ResourceTraceType, React.ReactElement> = {
    [ResourceTraceType.INPUT]: <InputIcon color="success" />,
    [ResourceTraceType.ASSIGNMENT]: <AssignmentIcon color="warning" />,
    [ResourceTraceType.TRANSFER]: <TransferIcon color="info" />,
    [ResourceTraceType.UNASSIGNMENT]: <UnassignmentIcon color="action" />,
    [ResourceTraceType.REPAIR]: <RepairIcon color="disabled" />,
    [ResourceTraceType.OUTPUT]: <OutputIcon color="error" />,
  };

  return (
    <>
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
    </>
  );
}
