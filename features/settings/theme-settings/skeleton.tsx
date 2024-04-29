import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

export function ThemeSettingsSkeleton() {
  return (
    <Stack
      component={Paper}
      spacing={2}
      divider={<Divider flexItem />}
      sx={{ padding: 2 }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Typography component="h2" variant="subtitle1" fontWeight="bolder">
          <Skeleton width="15ch" />
        </Typography>

        <Skeleton variant="rounded" width="10ch" height={30} />
      </Stack>

      <Stack spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography component="h3" variant="subtitle2" color="text.secondary">
            <Skeleton width="15ch" />
          </Typography>

          <Skeleton variant="rounded" width={72} height={36} />
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography component="h3" variant="subtitle2" color="text.secondary">
            <Skeleton width="25ch" />
          </Typography>

          <Skeleton variant="rounded" width={40} height={40} />
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography component="h3" variant="subtitle2" color="text.secondary">
            <Skeleton width="25ch" />
          </Typography>

          <Skeleton variant="rounded" width={40} height={40} />
        </Stack>
      </Stack>
    </Stack>
  );
}
