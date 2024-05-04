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

import { DashboardNavigationGroup } from "../../types";

import { NavigationItem } from "../navigation-item";

export function NavigationGroup({
  icon,
  heading,
  items,
}: DashboardNavigationGroup) {
  const pathname = usePathname();

  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md")
  );

  const [expanded, setExpanded] = useState<boolean>(true);

  const selected = items.some(({ href }) => pathname.startsWith(href));

  return (
    <>
      {!isMobile && (
        <ListItemButton
          selected={selected}
          onClick={() => setExpanded((prev) => !prev)}
        >
          <ListItemIcon sx={{ minWidth: "fit-content" }}>{icon}</ListItemIcon>

          <ListItemText sx={{ marginLeft: 2 }}>{heading}</ListItemText>

          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      )}

      <Collapse unmountOnExit timeout="auto" in={expanded || isMobile}>
        <List component="div" disablePadding>
          {items.map((item, index) => (
            <NavigationItem
              key={index}
              nested
              type={item.type}
              href={item.href}
              icon={item.icon}
              text={isMobile ? `${heading} - ${item.text}` : item.text}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
}
