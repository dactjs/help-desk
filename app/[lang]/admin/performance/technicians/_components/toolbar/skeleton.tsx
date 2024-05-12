import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";

export function IndividualPerformanceToolbarSkeleton() {
  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      alignItems="center"
      spacing={1}
      useFlexGap
    >
      <Stack
        direction="row"
        divider={<Divider flexItem orientation="vertical" />}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width={100}
            height={31}
            sx={[
              index === 0 && {
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
              },
              index === 3 && {
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
              },
            ]}
          />
        ))}
      </Stack>

      <Skeleton variant="rounded" width={64} height={40} />
    </Stack>
  );
}
