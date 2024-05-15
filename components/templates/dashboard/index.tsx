import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import { auth } from "@/auth";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/common";
import { prisma } from "@/lib/prisma";

import { AppBar } from "./components/app-bar";
import { NavigationItem } from "./components/navigation-item";
import { NavigationGroup } from "./components/navigation-group";
import { SignOutButton } from "./components/sign-out-button";
import { LayoutPreferencesSchema } from "./schemas";
import { DashboardNavigation, DashboardNavigationType } from "./types";

export interface DashboardProps {
  navigation: DashboardNavigation;
  children: React.ReactNode;
}

export async function Dashboard({ navigation, children }: DashboardProps) {
  const language = getAppLanguage();

  const [session, dictionary] = await Promise.all([
    auth(),
    getDictionary(language),
  ]);

  // TODO: add auth
  const user = await prisma.user.findUnique({
    where: { id: String(session?.user?.id) },
    select: { preferences: true },
  });

  const preferences = LayoutPreferencesSchema.parse(
    user?.preferences?.layout ?? {}
  );

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "auto 1fr",
          md: preferences.dashboard.expanded
            ? "minmax(auto, 15em) 1fr"
            : "auto 1fr",
        },
        gridTemplateRows: "auto 1fr",
        gridTemplateAreas: {
          xs: `
                "app-bar app-bar"
                "drawer content"
              `,
          md: preferences.dashboard.expanded
            ? `
                "drawer app-bar"
                "drawer content"
              `
            : `
                "app-bar app-bar"
                "drawer content"
              `,
        },
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <AppBar preferences={preferences} />

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
            display: {
              xs: "none",
              md: preferences.dashboard.expanded ? "block" : "none",
            },
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
                <NavigationItem
                  key={element.text}
                  item={element}
                  preferences={preferences}
                />
              ) : (
                <NavigationGroup
                  key={element.heading}
                  group={element}
                  preferences={preferences}
                />
              )
            )}
          </List>
        </Box>

        <Box component="section" sx={{ marginTop: "auto", padding: 1 }}>
          <SignOutButton preferences={preferences} language={language}>
            {dictionary.dashboard.sign_out_button_text}
          </SignOutButton>
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
