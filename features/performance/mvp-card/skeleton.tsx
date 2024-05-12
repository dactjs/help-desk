import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

export function MVPCardSkeleton() {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardHeader
        subheader={<Skeleton width="75%" />}
        action={<Skeleton variant="circular" width={40} height={40} />}
      />

      <CardContent
        component={Stack}
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{
          height: "100%",
          overflowY: "auto",
          borderTop: 1,
          borderTopColor: "divider",
        }}
      >
        <Skeleton variant="circular" width={80} height={80} />

        <Stack>
          <Typography component="h2" variant="h4" align="center">
            <Skeleton width="15ch" sx={{ marginX: "auto" }} />
          </Typography>

          <Typography component="strong" variant="subtitle1" align="center">
            <Skeleton width="25ch" sx={{ marginX: "auto" }} />
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
