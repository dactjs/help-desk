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
    <Tooltip arrow placement="right" title={isMobile && text}>
      <ListItem disablePadding>
        <ListItemButton
          LinkComponent={Link}
          href={href}
          selected={(selected && !nested) || (selected && isMobile)}
          sx={[
            !!nested && !isMobile && { paddingX: 4 },
            !!nested && !isMobile && selected && { color: "secondary.main" },
          ]}
        >
          <ListItemIcon sx={{ minWidth: "fit-content", color: "inherit" }}>
            {icon}
          </ListItemIcon>

          {!isMobile && (
            <ListItemText
              primaryTypographyProps={{
                fontWeight: !!nested && selected ? "bolder" : "normal",
                color: "inherit",
              }}
              sx={{ marginLeft: 2 }}
            >
              {text}
            </ListItemText>
          )}
        </ListItemButton>
      </ListItem>
    </Tooltip>
  );
}
