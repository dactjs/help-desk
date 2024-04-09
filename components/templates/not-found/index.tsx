import Link from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { Illustration } from "./components/illustration";

export interface NotFoundProps {
  heading: string;
  description: string;
  callToAction?: {
    href: string;
    text: string;
  };
}

export const NotFound: React.FC<NotFoundProps> = ({
  heading,
  description,
  callToAction,
}) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ padding: 4 }}
    >
      <Stack sx={{ maxWidth: 225 }}>
        <Illustration />
      </Stack>

      <Stack>
        <Typography component="h1" variant="h4" align="center">
          {heading}
        </Typography>

        <Typography
          component="p"
          variant="caption"
          align="center"
          fontWeight="bolder"
          color="text.secondary"
        >
          {description}
        </Typography>
      </Stack>

      {callToAction && (
        <Button
          LinkComponent={Link}
          href={callToAction.href}
          variant="contained"
          size="small"
          color="primary"
        >
          {callToAction.text}
        </Button>
      )}
    </Stack>
  );
};
