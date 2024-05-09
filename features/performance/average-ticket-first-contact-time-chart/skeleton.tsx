import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

export function AverageTicketFirstContactTimeChartSkeleton() {
  return (
    <Stack
      component={Paper}
      spacing={1}
      divider={<Divider flexItem />}
      sx={{ height: "100%", padding: 2 }}
    >
      <Typography component="h2" variant="h6">
        <Skeleton width="10ch" />
      </Typography>

      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Skeleton
          variant="circular"
          sx={{
            width: { xs: 225, sm: 275 },
            height: { xs: 225, sm: 275 },
          }}
        />
      </Stack>
    </Stack>
  );
}
