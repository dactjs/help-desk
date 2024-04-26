"use client";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { PieChart, PieChartProps } from "@mui/x-charts/PieChart";

import { Empty } from "@/components/templates/empty";
import { Dictionary } from "@/internationalization/dictionaries/tickets";

import { TicketCompletionRateChartData } from "./types";

export interface ClientTicketCompletionRateChartProps {
  data: TicketCompletionRateChartData;
  dictionary: Pick<Dictionary, "ticket_completion_rate_chart">;
}

export function ClientTicketCompletionRateChart({
  data: { completed, uncompleted },
  dictionary: { ticket_completion_rate_chart },
}: ClientTicketCompletionRateChartProps) {
  const series: PieChartProps["series"] = [
    {
      arcLabel: ({ value }) =>
        `${((value / (completed + uncompleted)) * 100).toFixed(2)}%`,
      highlightScope: { faded: "global", highlighted: "item" },
      faded: { additionalRadius: -10, color: "gray" },
      innerRadius: "50%",
      data: [
        {
          id: ticket_completion_rate_chart.completed_label,
          value: completed,
          label: ticket_completion_rate_chart.completed_label,
        },
        {
          id: ticket_completion_rate_chart.uncompleted_label,
          value: uncompleted,
          label: ticket_completion_rate_chart.uncompleted_label,
        },
      ],
    },
  ];

  return (
    <Stack
      component={Paper}
      spacing={1}
      divider={<Divider flexItem />}
      sx={{ height: "100%", padding: 2 }}
    >
      <Typography component="h2" variant="h6">
        {ticket_completion_rate_chart.heading}
      </Typography>

      <Stack sx={{ flex: 1, placeContent: "center", padding: 4 }}>
        {completed || uncompleted ? (
          <PieChart
            series={series}
            margin={{ top: 0, left: 0, bottom: 0, right: 0 }}
            slotProps={{ legend: { hidden: true } }}
          />
        ) : (
          <Empty caption={ticket_completion_rate_chart["empty-caption"]} />
        )}
      </Stack>
    </Stack>
  );
}
