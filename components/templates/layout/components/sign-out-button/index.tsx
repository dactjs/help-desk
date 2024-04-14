import LogoutIcon from "@mui/icons-material/Logout";

import { signOut } from "@/auth";
import { SubmitButton } from "@/components/forms/submit-button";
import { getDictionary } from "@/internationalization/dictionaries/auth";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";

export const SignOutButton: React.FC = async () => {
  const language = getAppLanguage();

  const { sign_out_button_text } = await getDictionary(language);

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
        variant="contained"
        color="inherit"
        startIcon={<LogoutIcon color="error" />}
      >
        {sign_out_button_text}
      </SubmitButton>
    </form>
  );
};
