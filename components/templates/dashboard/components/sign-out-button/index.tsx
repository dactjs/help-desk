import { headers } from "next/headers";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

import { signOut } from "@/auth";
import { SubmitButton } from "@/components/forms/submit-button";
import { getLanguageFromHeaders } from "@/utils/get-language-from-headers";

import { getDictionary } from "./_dictionaries";

export const SignOutButton: React.FC = async () => {
  const language = getLanguageFromHeaders(headers());

  const { text } = await getDictionary(language);

  const handleSignOut = async () => {
    "use server";

    await signOut({
      redirect: true,
      redirectTo: `/${language}/auth/sign-in`,
    });
  };

  return (
    <form action={handleSignOut}>
      <SubmitButton
        fullWidth
        type="submit"
        variant="outlined"
        color="error"
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        {text}
      </SubmitButton>

      <IconButton
        type="submit"
        color="error"
        aria-label={text}
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        <LogoutIcon />
      </IconButton>
    </form>
  );
};
