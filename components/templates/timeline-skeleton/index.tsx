"use client";

import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineDot from "@mui/lab/TimelineDot";

export const TimelineSkeleton: React.FC = () => (
  <Paper sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
    <AppBar position="static" sx={{ borderRadius: "inherit" }}>
      <Toolbar>
        <Typography component="h2" variant="body1" fontWeight="bolder">
          <Skeleton width="20ch" />
        </Typography>
      </Toolbar>
    </AppBar>

    <Timeline sx={{ height: "100%", overflowY: "auto" }}>
      {Array.from({ length: 10 }).map((_, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent>
            <Typography fontWeight="bolder">
              <Skeleton />
            </Typography>

            <Typography variant="caption" color="text.secondary">
              <Skeleton />
            </Typography>
          </TimelineOppositeContent>

          <TimelineSeparator>
            <TimelineConnector />

            <TimelineDot variant="outlined">
              <Skeleton variant="circular" width={30} height={30} />
            </TimelineDot>

            <TimelineConnector />
          </TimelineSeparator>

          <TimelineContent sx={{ paddingX: 2, paddingY: 1.5 }}>
            <Typography fontWeight="bolder">
              <Skeleton />
            </Typography>

            <Typography variant="caption" color="text.secondary">
              <Skeleton />
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  </Paper>
);
