"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSnackbar } from "notistack";

import Logo from "@/public/logo--white.webp";

import { changePreferences } from "../../actions/change-preferences";
import { LayoutPreferences } from "../../schemas";

export interface AppBarPops {
  preferences: LayoutPreferences;
}

export function AppBar({ preferences }: AppBarPops) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md")
  );

  const expanded = preferences.dashboard.expanded && !isMobile;

  const handleOnClick = async () => {
    try {
      await changePreferences({ dashboard: { expanded: !expanded } });
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        enqueueSnackbar(error.message, {
          variant: "error",
          style: { whiteSpace: "pre-line" },
        });
      }
    }
  };

  return (
    <MuiAppBar position="sticky" sx={{ gridArea: "app-bar" }}>
      <Toolbar
        variant="regular"
        sx={{
          justifyContent: { xs: "flex-end", md: "space-between" },
          alignItems: "center",
        }}
      >
        {!isMobile && (
          <IconButton size="small" edge="start" onClick={handleOnClick}>
            {expanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        )}

        <Image
          alt="Logo"
          src={Logo}
          style={{ width: "auto", height: "100%", objectFit: "cover" }}
        />
      </Toolbar>
    </MuiAppBar>
  );
}
