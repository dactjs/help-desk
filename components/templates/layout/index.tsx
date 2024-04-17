import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import { auth } from "@/auth";

import { SignOutButton } from "./components/sign-out-button";

export interface LayoutProps {
  children: React.ReactNode;
}

export async function Layout({ children }: LayoutProps) {
  const session = await auth();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto 1fr",
        gridTemplateAreas: `
          "header"
          "content"
        `,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        component="header"
        sx={{
          gridArea: "header",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          padding: 1,
          boxShadow: 4,
          backgroundColor: "primary.main",
        }}
      >
        <Box component="section">
          <Stack
            component={Paper}
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ padding: 1 }}
          >
            <Avatar alt={String(session?.user?.name)} />

            <Stack>
              <Typography component="strong" variant="subtitle2">
                {session?.user?.name}
              </Typography>

              <Typography component="span" variant="caption">
                {session?.user?.email}
              </Typography>
            </Stack>
          </Stack>
        </Box>

        <Box component="section">
          <SignOutButton />
        </Box>
      </Box>

      <Box
        component="main"
        sx={{
          gridArea: "content",
          position: "relative",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
