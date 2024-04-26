import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import ExpandIcon from "@mui/icons-material/ExpandMore";

export function CommentsSkeleton() {
  return (
    <Paper sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <AppBar position="static" sx={{ borderRadius: "inherit" }}>
        <Toolbar sx={{ justifyContent: "space-between", gap: 1 }}>
          <Typography component="h2" variant="body1" fontWeight="bolder">
            <Skeleton width="20ch" />
          </Typography>

          <Skeleton variant="circular" width={40} height={40} />
        </Toolbar>
      </AppBar>

      <Stack sx={{ height: "100%", padding: 2, overflowY: "auto" }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Accordion key={index} disabled>
            <AccordionSummary expandIcon={<ExpandIcon />} />
          </Accordion>
        ))}
      </Stack>
    </Paper>
  );
}
