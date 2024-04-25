"use client";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { LineChart, LineChartProps } from "@mui/x-charts/LineChart";

import { Dictionary } from "@/internationalization/dictionaries/tickets";

import { TicketWeeklyActivityChartData } from "./types";

export interface ClientTicketWeeklyActivityChartProps {
  data: TicketWeeklyActivityChartData;
  dictionary: Pick<Dictionary, "ticket_weekly_activity_chart">;
}

export function ClientTicketWeeklyActivityChart({
  data,
  dictionary: {
    ticket_weekly_activity_chart: { heading, days },
  },
}: ClientTicketWeeklyActivityChartProps) {
  const xAxis: LineChartProps["xAxis"] = [
    {
      dataKey: "hour",
      scaleType: "band",
      valueFormatter: (hour: number) => `${String(hour).padStart(2, "0")}:00`,
    },
  ];

  const series: LineChartProps["series"] = Object.entries(days).map(
    ([key, day]) => ({
      dataKey: key,
      label: day,
    })
  );

  return (
    <Stack
      component={Paper}
      divider={<Divider flexItem />}
      sx={{ height: "100%", padding: 2 }}
    >
      <Typography component="h2" variant="h6">
        {heading}
      </Typography>

      <Stack sx={{ flex: 1, placeContent: "center" }}>
        <LineChart
          xAxis={xAxis}
          series={series}
          dataset={data}
          margin={{ top: 30, right: 30, bottom: 20, left: 30 }}
          slotProps={{ legend: { hidden: true } }}
        />
      </Stack>
    </Stack>
  );
}
