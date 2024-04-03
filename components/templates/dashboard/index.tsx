import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
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
}

export const Dashboard: React.FC<
  React.PropsWithChildren<DashboardProps>
> = async ({ navigation, children }) => {
  const session = await auth();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "auto 1fr", md: "200px 1fr" },
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
      <Box
        component="header"
        sx={{
          gridArea: "header",
          height: 64,
          boxShadow: 4,
          backgroundColor: "primary.main",
        }}
      />

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
};
