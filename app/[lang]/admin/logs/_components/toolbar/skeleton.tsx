import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";

export function LogsToolbarSkeleton() {
  return (
    <Stack
      direction="row"
      divider={<Divider flexItem orientation="vertical" />}
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          width={75}
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
  );
}
