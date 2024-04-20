import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Illustration } from "./components/illustration";

export interface EmptyProps {
  caption: string;
}

export function Empty({ caption }: EmptyProps) {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ padding: 4 }}
    >
      <Stack sx={{ maxWidth: 125 }}>
        <Illustration />
      </Stack>

      <Typography
        variant="caption"
        align="center"
        fontWeight="bolder"
        color="text.secondary"
      >
        {caption}
      </Typography>
    </Stack>
  );
}
