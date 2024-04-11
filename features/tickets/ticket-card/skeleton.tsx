import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";

export function TicketCardSkeleton(): React.ReactElement {
  return (
    <Paper sx={{ height: "100%", overflow: "hidden" }}>
      <Stack sx={{ height: "100%" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
          sx={{ minHeight: 58.5, paddingLeft: 2, paddingRight: 1 }}
        >
          <Skeleton variant="rounded" width={175} height={16} />
          <Skeleton variant="circular" width={34} height={34} />
        </Stack>

        <Stack
          spacing={1}
          divider={<Divider flexItem />}
          sx={{
            height: "100%",
            paddingX: 2,
            paddingY: 3,
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <Skeleton variant="rounded" height={32} />
          <Skeleton variant="rounded" height={100} />
          <Skeleton variant="rounded" height={75} />
        </Stack>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          sx={{ minHeight: 50, marginTop: "auto" }}
        >
          <Skeleton variant="circular" width={34} height={34} />
          <Skeleton variant="circular" width={34} height={34} />
          <Skeleton variant="circular" width={34} height={34} />
        </Stack>
      </Stack>
    </Paper>
  );
}
