import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

import { DEFAULT_PAGINATION } from "./config";

export function TicketListSkeleton() {
  return (
    <Stack
      spacing={1}
      divider={<Divider flexItem />}
      sx={{ height: "100%", overflow: "hidden" }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          divider={<Divider flexItem orientation="vertical" />}
        >
          <Stack
            direction="row"
            divider={<Divider flexItem orientation="vertical" />}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={index === 0 || index === 5 ? 40 : 39}
                height={40}
                sx={[
                  index === 0 && {
                    borderTopLeftRadius: 4,
                    borderBottomLeftRadius: 4,
                  },
                  index === 5 && {
                    borderTopRightRadius: 4,
                    borderBottomRightRadius: 4,
                  },
                ]}
              />
            ))}
          </Stack>
        </Stack>

        <Skeleton variant="rounded" width={200} height={40} />
      </Stack>

      <Stack
        component="ul"
        spacing={2}
        sx={{ height: "100%", padding: 0, overflow: "auto" }}
      >
        {Array.from({ length: DEFAULT_PAGINATION.PAGE_SIZE }).map(
          (_, index) => {
            const random = Math.round(
              Math.random() * DEFAULT_PAGINATION.PAGE_SIZE
            );

            const primary =
              random % 3 === 0 ? "70%" : random % 2 === 0 ? "50%" : "60%";

            const secondary =
              (random + index) % 3 === 0
                ? "40%"
                : random % 2 === 0
                ? "60%"
                : "50%";

            return (
              <Paper key={index} sx={{ padding: 2 }}>
                <Stack
                  component="li"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={1}
                >
                  <Stack sx={{ width: "100%" }}>
                    <Typography>
                      <Skeleton width={primary} />
                    </Typography>

                    <Typography variant="body2">
                      <Skeleton width={secondary} />
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>
            );
          }
        )}
      </Stack>

      <Stack
        direction="row"
        justifyContent={{ xs: "center", sm: "flex-end" }}
        alignItems="center"
        spacing={1}
      >
        <Stack direction="row" spacing={0.5}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" width={32} height={32} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
