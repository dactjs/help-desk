import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import { auth } from "@/auth";

import { NavigationItem } from "./components/navigation-item";
import { NavigationGroup } from "./components/navigation-group";
import { SignOutButton } from "./components/sign-out-button";
import { DashboardNavigation, DashboardNavigationType } from "./types";

export interface DashboardProps {
  navigation: DashboardNavigation;
  children: React.ReactNode;
}

export async function Dashboard({ navigation, children }: DashboardProps) {
  const session = await auth();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "auto 1fr",
          md: "minmax(auto, 15em) 1fr",
        },
        gridTemplateRows: "auto 1fr",
        gridTemplateAreas: {
          xs: `
                "header header"
                "drawer content"
              `,
          md: `
                "drawer header"
                "drawer content"
              `,
        },
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <AppBar position="sticky" sx={{ gridArea: "header" }}>
        <Toolbar />
      </AppBar>

      <Box
        component="aside"
        sx={{
          gridArea: "drawer",
          display: "flex",
          flexDirection: "column",
          boxShadow: 4,
        }}
      >
        <Box
          component="section"
          sx={{
            display: { xs: "none", md: "block" },
            padding: 1,
            borderBottom: 1,
            borderBottomColor: "divider",
          }}
        >
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

        <Box
          component="nav"
          sx={{ height: "100%", overflowX: "hidden", overflowY: "auto" }}
        >
          <List disablePadding>
            {navigation.map((element) =>
              element.type === DashboardNavigationType.ITEM ? (
                <NavigationItem key={element.text} {...element} />
              ) : (
                <NavigationGroup key={element.heading} {...element} />
              )
            )}
          </List>
        </Box>

        <Box component="section" sx={{ marginTop: "auto", padding: 1 }}>
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
