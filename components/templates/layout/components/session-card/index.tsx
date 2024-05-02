"use client";

import { useState } from "react";
import Link from "next/link";
import { Session } from "next-auth";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSnackbar } from "notistack";

import { Dictionary } from "@/internationalization/dictionaries/common";
import { SupportedLanguage } from "@/internationalization/types";

import { signOut } from "../../actions/sign-out";

export interface SessionCardProps {
  session: Session | null;
  language: SupportedLanguage;
  dictionary: Pick<Dictionary, "layout">;
}

export function SessionCard({
  session,
  language,
  dictionary: {
    layout: { settings_item_text, sign_out_item_text },
  },
}: SessionCardProps) {
  const { enqueueSnackbar } = useSnackbar();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleSignOut = async () => {
    try {
      await signOut();
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
    <>
      <Stack
        component={Paper}
        direction="row"
        alignItems="center"
        spacing={1}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{
          padding: 1,
          transition: "background-color 0.2s ease-in-out",
          "&:hover": {
            cursor: "pointer",
            backgroundColor: "action.hover",
          },
        }}
      >
        <Avatar
          alt={String(session?.user?.name)}
          sx={{ width: 20, height: 20 }}
        />

        <Typography component="strong" variant="subtitle2">
          {session?.user?.name}
        </Typography>
      </Stack>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        sx={{ marginTop: 1 }}
        onClose={() => setAnchorEl(null)}
      >
        <Paper>
          <MenuList>
            <li>
              <MenuItem
                component={Link}
                href={`/${language}/dashboard/settings`}
              >
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>

                <ListItemText>{settings_item_text}</ListItemText>
              </MenuItem>
            </li>

            <Divider />

            <MenuItem onClick={handleSignOut}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" color="error" />
              </ListItemIcon>

              <ListItemText primaryTypographyProps={{ fontWeight: "bolder" }}>
                {sign_out_item_text}
              </ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Popover>
    </>
  );
}
