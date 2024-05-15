"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/material/styles";

import { LayoutPreferences } from "../../schemas";
import { DashboardNavigationGroup } from "../../types";

import { NavigationItem } from "../navigation-item";

export interface NavigationGroupProps {
  group: DashboardNavigationGroup;
  preferences: LayoutPreferences;
}

export function NavigationGroup({ group, preferences }: NavigationGroupProps) {
  const pathname = usePathname();

  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md")
  );

  const [collapsed, setCollapsed] = useState<boolean>(false);

  const expanded = preferences.dashboard.expanded && !isMobile;

  const selected = group.items.some(({ href }) => pathname.startsWith(href));

  return (
    <>
      {expanded && (
        <ListItemButton
          selected={selected}
          onClick={() => setCollapsed((prev) => !prev)}
        >
          <ListItemIcon sx={{ minWidth: "fit-content", color: "inherit" }}>
            {group.icon}
          </ListItemIcon>

          <ListItemText sx={{ marginLeft: 2 }}>{group.heading}</ListItemText>

          {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </ListItemButton>
      )}

      <Collapse unmountOnExit timeout="auto" in={!collapsed || !expanded}>
        <List component="div" disablePadding>
          {group.items.map(({ type, href, icon, text }, index) => {
            const item = {
              type,
              href,
              icon,
              text: !expanded ? `${group.heading} - ${text}` : text,
            };

            return (
              <NavigationItem
                key={index}
                nested
                item={item}
                preferences={preferences}
              />
            );
          })}
        </List>
      </Collapse>
    </>
  );
}
