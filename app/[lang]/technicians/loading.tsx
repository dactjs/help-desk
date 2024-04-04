import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

export default function TechniciansLoading() {
  return (
    <Container
      fixed
      sx={{
        display: "grid",
        minHeight: "100%",
        placeContent: "center",
      }}
    >
      <CircularProgress />
    </Container>
  );
}
