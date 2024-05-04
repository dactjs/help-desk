import Image from "next/image";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { auth } from "@/auth";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/common";
import Logo from "@/public/logo--white.webp";

import { SessionCard } from "./components/session-card";

export interface LayoutProps {
  children: React.ReactNode;
}

export async function Layout({ children }: LayoutProps) {
  const language = getAppLanguage();

  const [session, dictionary] = await Promise.all([
    auth(),
    getDictionary(language),
  ]);

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
      <AppBar position="sticky" sx={{ gridArea: "header" }}>
        <Toolbar
          variant="regular"
          sx={{ justifyContent: "space-between", alignItems: "center", gap: 1 }}
        >
          <Image
            alt="Logo"
            src={Logo}
            style={{ width: "auto", height: "100%", objectFit: "cover" }}
          />

          <SessionCard
            session={session}
            language={language}
            dictionary={{ layout: dictionary.layout }}
          />
        </Toolbar>
      </AppBar>

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
