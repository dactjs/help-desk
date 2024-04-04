import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function AuthLoading() {
  return (
    <Backdrop open>
      <CircularProgress />
    </Backdrop>
  );
}
