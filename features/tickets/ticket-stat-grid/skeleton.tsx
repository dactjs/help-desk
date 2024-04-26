import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

export function TicketStatGridSkeleton() {
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid key={index} xs="auto">
          <Stack
            component={Paper}
            spacing={1}
            sx={{ minWidth: 225, padding: 2 }}
          >
            <Typography variant="caption" fontSize="large">
              <Skeleton width="80%" />
            </Typography>

            <Typography variant="h4" fontWeight="bolder">
              <Skeleton width="40%" />
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}
