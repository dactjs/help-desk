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

import { DashboardNavigationGroup } from "../../types/navigation";

import { NavigationItem } from "../navigation-item";

export const NavigationGroup: React.FC<DashboardNavigationGroup> = ({
  icon,
  heading,
  items,
}) => {
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
          <ListItemIcon>{icon}</ListItemIcon>

          <ListItemText>{heading}</ListItemText>

          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      )}

      <Collapse unmountOnExit timeout="auto" in={expanded || isMobile}>
        <List component="div" disablePadding>
          {items.map((item) => (
            <NavigationItem key={`${heading}-${item.href}`} nested {...item} />
          ))}
        </List>
      </Collapse>
    </>
  );
};
