"use client";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

import { Dictionary } from "@/internationalization/dictionaries/performance";

import { TIME_GUIDE } from "./config";
import { AverageTicketFirstContactTimeChartData } from "./types";

export interface ClientAverageTicketFirstContactTimeChartProps {
  data: AverageTicketFirstContactTimeChartData;
  dictionary: Pick<Dictionary, "average_ticket_resolution_time_chart">;
}

export function ClientAverageTicketFirstContactTimeChart({
  data,
  dictionary: { average_ticket_resolution_time_chart },
}: ClientAverageTicketFirstContactTimeChartProps) {
  const hours = String(Math.floor(data / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((data % 3600) / 60)).padStart(2, "0");
  const seconds = String(data % 60).padStart(2, "0");

  const text = data ? `${hours}:${minutes}:${seconds}` : "--:--:--";

  return (
    <Stack
      component={Paper}
      spacing={1}
      divider={<Divider flexItem />}
      sx={{ height: "100%", padding: 2 }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Typography component="h2" variant="h6">
          {average_ticket_resolution_time_chart.heading}
        </Typography>

        <Tooltip title={average_ticket_resolution_time_chart.tooltip}>
          <InfoIcon fontSize="small" color="info" />
        </Tooltip>
      </Stack>

      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Gauge
          text={text}
          margin={{ top: 0, left: 0, bottom: 0, right: 0 }}
          sx={{
            width: { xs: 225, sm: 275 },
            height: { xs: 225, sm: 275 },

            [`& .${gaugeClasses.referenceArc}`]: {
              fill: (theme) =>
                data >= TIME_GUIDE.VERY_BAD
                  ? theme.palette.error.dark
                  : data >= TIME_GUIDE.BAD
                  ? theme.palette.error.light
                  : data >= TIME_GUIDE.NORMAL
                  ? theme.palette.info
                  : data >= TIME_GUIDE.GOOD
                  ? theme.palette.success.light
                  : theme.palette.success.dark,
            },

            [`& .${gaugeClasses.valueText}`]: {
              fontFamily: "monospace",
              fontSize: "1.5em",
              fontWeight: "bold",
              transform: "translate(0px, 0px)",
            },
          }}
        />
      </Stack>
    </Stack>
  );
}
