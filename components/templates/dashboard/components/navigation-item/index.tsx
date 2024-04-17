"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/material/styles";

import { DashboardNavigationItem } from "../../types";

export interface NavigationItemProps extends DashboardNavigationItem {
  nested?: boolean;
}

export function NavigationItem({
  href,
  icon,
  text,
  nested,
}: NavigationItemProps) {
  const pathname = usePathname();

  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md")
  );

  const selected = pathname.startsWith(href);

  return (
    <ListItem disablePadding>
      <ListItemButton
        LinkComponent={Link}
        href={href}
        selected={selected}
        sx={[Boolean(nested) && !isMobile && { paddingX: 4 }]}
      >
        <ListItemIcon sx={{ minWidth: "fit-content" }}>{icon}</ListItemIcon>

        {!isMobile && (
          <ListItemText sx={{ marginLeft: 2 }}>{text}</ListItemText>
        )}
      </ListItemButton>
    </ListItem>
  );
}
