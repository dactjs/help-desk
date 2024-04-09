import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const DataGridSkeleton: React.FC = () => {
  return (
    <Stack
      sx={{
        height: "100%",
        borderRadius: 1,
        border: 1,
        borderColor: "divider",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ height: 50, padding: 2 }}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rounded"
            width={index % 2 ? 100 : 75}
            height={32}
          />
        ))}
      </Stack>

      <Stack
        divider={<Divider flexItem />}
        sx={{
          display: "grid",
          height: "100%",
          borderTop: 1,
          borderBottom: 1,
          borderColor: "divider",
          overflow: "auto",
        }}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width="100%"
            height={56}
          />
        ))}
      </Stack>

      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
        sx={{ height: 50, padding: 2 }}
      >
        <Skeleton width={200} height={20} />
        <Skeleton width={125} height={20} />

        <ChevronLeftIcon color="disabled" />
        <ChevronRightIcon color="disabled" />
      </Stack>
    </Stack>
  );
};
