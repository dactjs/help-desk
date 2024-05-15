"use client";

import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSnackbar } from "notistack";

import { SupportedLanguage } from "@/internationalization/types";

import { signOut } from "../../actions/sign-out";
import { LayoutPreferences } from "../../schemas";

export interface SignOutButtonProps {
  preferences: LayoutPreferences;
  language: SupportedLanguage;
  children: string;
}

export function SignOutButton({
  preferences,
  language,
  children,
}: SignOutButtonProps) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const isMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("md")
  );

  const expanded = preferences.dashboard.expanded && !isMobile;

  const handleSignOut = async () => {
    try {
      await signOut();

      router.replace(`/${language}/auth/sign-in`);
    } catch (error) {
      if (error instanceof Error) {
        enqueueSnackbar(error.message, {
          variant: "error",
          style: { whiteSpace: "pre-line" },
        });
      }
    }
  };

  if (expanded) {
    return (
      <Button
        fullWidth
        type="submit"
        variant="outlined"
        color="error"
        onClick={handleSignOut}
      >
        {children}
      </Button>
    );
  }

  return (
    <IconButton
      type="submit"
      color="error"
      aria-label={children}
      onClick={handleSignOut}
    >
      <LogoutIcon />
    </IconButton>
  );
}
