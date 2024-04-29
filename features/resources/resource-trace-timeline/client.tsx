"use client";

import { useState } from "react";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputIcon from "@mui/icons-material/Input";
import AssignmentIcon from "@mui/icons-material/AssignmentInd";
import TransferIcon from "@mui/icons-material/SwapHoriz";
import UnassignmentIcon from "@mui/icons-material/AssignmentReturn";
import RepairIcon from "@mui/icons-material/Hardware";
import OutputIcon from "@mui/icons-material/Output";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineDot from "@mui/lab/TimelineDot";
import { ResourceTraceType } from "@prisma/client";

import { Dictionary } from "@/internationalization/dictionaries/resources";
import { SupportedLanguage } from "@/internationalization/types";

import { ResourceTraceDetailsDialog } from "./components/resource-trace-details-dialog";
import { ResourceTrace } from "./types";

export interface ClientResourceTraceTimelineProps {
  traces: ResourceTrace[];
  context: string | null;
  language: SupportedLanguage;
  dictionary: Pick<
    Dictionary,
    | "resource_trace_model"
    | "resource_trace_timeline"
    | "resource_trace_details_dialog"
  >;
}

export function ClientResourceTraceTimeline({
  traces,
  context,
  language,
  dictionary: {
    resource_trace_model,
    resource_trace_timeline,
    resource_trace_details_dialog,
  },
}: ClientResourceTraceTimelineProps) {
  const [trace, setTrace] = useState<ResourceTrace | null>(null);

  const type: Record<ResourceTraceType, string> = {
    [ResourceTraceType.INPUT]: resource_trace_model["type--input"],
    [ResourceTraceType.ASSIGNMENT]: resource_trace_model["type--assignment"],
    [ResourceTraceType.TRANSFER]: resource_trace_model["type--transfer"],
    [ResourceTraceType.UNASSIGNMENT]:
      resource_trace_model["type--unassignment"],
    [ResourceTraceType.REPAIR]: resource_trace_model["type--repair"],
    [ResourceTraceType.OUTPUT]: resource_trace_model["type--output"],
  };

  const icons: Record<ResourceTraceType, React.ReactNode> = {
    [ResourceTraceType.INPUT]: <InputIcon color="success" />,
    [ResourceTraceType.ASSIGNMENT]: <AssignmentIcon color="warning" />,
    [ResourceTraceType.TRANSFER]: <TransferIcon color="info" />,
    [ResourceTraceType.UNASSIGNMENT]: <UnassignmentIcon color="action" />,
    [ResourceTraceType.REPAIR]: <RepairIcon color="disabled" />,
    [ResourceTraceType.OUTPUT]: <OutputIcon color="error" />,
  };

  return (
    <>
      {trace && (
        <ResourceTraceDetailsDialog
          fullWidth
          trace={trace}
          context={context}
          language={language}
          dictionary={{ resource_trace_model, resource_trace_details_dialog }}
          open={Boolean(trace)}
          onClose={() => setTrace(null)}
        />
      )}

      <Paper sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <AppBar position="static" sx={{ borderRadius: "inherit" }}>
          <Toolbar>
            <Typography component="h2" variant="body1" fontWeight="bolder">
              {resource_trace_timeline.heading}
            </Typography>
          </Toolbar>
        </AppBar>

        <Timeline sx={{ height: "100%", overflowY: "auto" }}>
          {traces.map((trace) => (
            <TimelineItem key={trace.id}>
              <TimelineOppositeContent>
                <Typography fontWeight="bolder">
                  {type[trace.type] ?? trace.type}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {new Date(trace.createdAt).toLocaleString(language)}
                </Typography>
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineConnector />

                <TimelineDot variant="outlined">
                  <IconButton size="small" onClick={() => setTrace(trace)}>
                    {icons[trace.type]}
                  </IconButton>
                </TimelineDot>

                <TimelineConnector />
              </TimelineSeparator>

              <TimelineContent sx={{ paddingX: 2, paddingY: 1.5 }}>
                <Typography fontWeight="bolder">
                  {resource_trace_timeline.made_by}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {trace.madeBy.name}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Paper>
    </>
  );
}
