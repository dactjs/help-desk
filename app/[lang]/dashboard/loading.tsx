import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function DashboardLoading(): React.ReactElement {
  return (
    <Backdrop open sx={{ position: "absolute" }}>
      <CircularProgress />
    </Backdrop>
  );
}