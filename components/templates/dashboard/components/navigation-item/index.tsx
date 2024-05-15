"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/material/styles";

import { LayoutPreferences } from "../../schemas";
import { DashboardNavigationItem } from "../../types";

export interface NavigationItemProps {
  item: DashboardNavigationItem;
  preferences: LayoutPreferences;
  nested?: boolean;
}

export function NavigationItem({
  item,
  preferences,
  nested,
}: NavigationItemProps) {
  const pathname = usePathname();

  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md")
  );

  const expanded = preferences.dashboard.expanded && !isMobile;

  const selected = pathname.startsWith(item.href);

  return (
    <Tooltip arrow placement="right" title={!expanded && item.text}>
      <ListItem disablePadding>
        <ListItemButton
          LinkComponent={Link}
          href={item.href}
          selected={(selected && !nested) || (selected && !expanded)}
          sx={[
            !!nested && expanded && { paddingX: 4 },
            !!nested && expanded && selected && { color: "secondary.main" },
          ]}
        >
          <ListItemIcon sx={{ minWidth: "fit-content", color: "inherit" }}>
            {item.icon}
          </ListItemIcon>

          {expanded && (
            <ListItemText
              primaryTypographyProps={{
                fontWeight: !!nested && selected ? "bolder" : "normal",
                color: "inherit",
              }}
              sx={{ marginLeft: 2 }}
            >
              {item.text}
            </ListItemText>
          )}
        </ListItemButton>
      </ListItem>
    </Tooltip>
  );
}
