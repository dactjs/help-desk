"use client";

import { useState } from "react";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ReceptionIcon from "@mui/icons-material/Input";
import AssignmentIcon from "@mui/icons-material/AssignmentInd";
import TransferIcon from "@mui/icons-material/SwapHoriz";
import OpenedIcon from "@mui/icons-material/HourglassBottom";
import ResolvedIcon from "@mui/icons-material/CheckCircle";
import ClosedIcon from "@mui/icons-material/Verified";
import CancelledIcon from "@mui/icons-material/Cancel";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineDot from "@mui/lab/TimelineDot";
import { TicketTraceType } from "@prisma/client";

import { Dictionary } from "@/internationalization/dictionaries/tickets";
import { SupportedLanguage } from "@/internationalization/types";

import { TicketTraceDetailsDialog } from "./components/ticket-trace-details-dialog";
import { TicketTrace } from "./types";

export interface ClientTicketTraceTimelineProps {
  traces: TicketTrace[];
  context: string | null;
  language: SupportedLanguage;
  dictionary: Pick<
    Dictionary,
    | "ticket_trace_model"
    | "ticket_trace_timeline"
    | "ticket_trace_details_dialog"
  >;
}

export function ClientTicketTraceTimeline({
  traces,
  context,
  language,
  dictionary: {
    ticket_trace_model,
    ticket_trace_timeline,
    ticket_trace_details_dialog,
  },
}: ClientTicketTraceTimelineProps) {
  const [trace, setTrace] = useState<TicketTrace | null>(null);

  const type: Record<TicketTraceType, string> = {
    [TicketTraceType.RECEPTION]: ticket_trace_model["type--reception"],
    [TicketTraceType.ASSIGNMENT]: ticket_trace_model["type--assignment"],
    [TicketTraceType.OPENED]: ticket_trace_model["type--opened"],
    [TicketTraceType.TRANSFER]: ticket_trace_model["type--transfer"],
    [TicketTraceType.RESOLVED]: ticket_trace_model["type--resolved"],
    [TicketTraceType.CLOSED]: ticket_trace_model["type--closed"],
    [TicketTraceType.CANCELLED]: ticket_trace_model["type--cancelled"],
  };

  const icons: Record<TicketTraceType, React.ReactNode> = {
    [TicketTraceType.RECEPTION]: <ReceptionIcon color="success" />,
    [TicketTraceType.ASSIGNMENT]: <AssignmentIcon color="warning" />,
    [TicketTraceType.TRANSFER]: <TransferIcon color="info" />,
    [TicketTraceType.OPENED]: <OpenedIcon color="disabled" />,
    [TicketTraceType.RESOLVED]: <ResolvedIcon color="action" />,
    [TicketTraceType.CLOSED]: <ClosedIcon color="success" />,
    [TicketTraceType.CANCELLED]: <CancelledIcon color="error" />,
  };

  return (
    <>
      {trace && (
        <TicketTraceDetailsDialog
          fullWidth
          trace={trace}
          context={context}
          language={language}
          dictionary={{ ticket_trace_model, ticket_trace_details_dialog }}
          open={Boolean(trace)}
          onClose={() => setTrace(null)}
        />
      )}

      <Paper sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <AppBar position="static" sx={{ borderRadius: "inherit" }}>
          <Toolbar>
            <Typography component="h2" variant="body1" fontWeight="bolder">
              {ticket_trace_timeline.heading}
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
                  {ticket_trace_timeline.made_by}
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
