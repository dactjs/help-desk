import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

export function TicketCompletionRateChartSkeleton() {
  return (
    <Stack
      component={Paper}
      spacing={1}
      divider={<Divider flexItem />}
      sx={{ height: "100%", padding: 2 }}
    >
      <Typography component="h2" variant="h6">
        <Skeleton width="15ch" />
      </Typography>

      <Stack sx={{ flex: 1, placeContent: "center", padding: 2 }}>
        <Skeleton variant="circular" sx={{ height: "100%" }} />
      </Stack>
    </Stack>
  );
}
