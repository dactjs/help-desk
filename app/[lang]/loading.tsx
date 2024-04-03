import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function RootLoading() {
  return (
    <Backdrop open>
      <CircularProgress />
    </Backdrop>
  );
}
