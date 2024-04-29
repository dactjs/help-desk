import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

export function InternationalizationSettingsSkeleton() {
  return (
    <Stack
      component={Paper}
      spacing={2}
      divider={<Divider flexItem />}
      sx={{ padding: 2 }}
    >
      <Typography component="h2" variant="subtitle1" fontWeight="bolder">
        <Skeleton width="15ch" />
      </Typography>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Typography component="h3" variant="subtitle2" color="text.secondary">
          <Skeleton width="15ch" />
        </Typography>

        <Skeleton variant="rounded" width={64} height={38} />
      </Stack>
    </Stack>
  );
}
