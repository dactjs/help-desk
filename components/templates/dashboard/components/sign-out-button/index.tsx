import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

import { signOut } from "@/auth";
import { SubmitButton } from "@/components/forms/submit-button";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/common";

export const SignOutButton: React.FC = async () => {
  const language = getAppLanguage();

  const {
    dashboard: { sign_out_button_text },
  } = await getDictionary(language);

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
        {sign_out_button_text}
      </SubmitButton>

      <IconButton
        type="submit"
        color="error"
        aria-label={sign_out_button_text}
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        <LogoutIcon />
      </IconButton>
    </form>
  );
};
