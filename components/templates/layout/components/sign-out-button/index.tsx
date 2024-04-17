import LogoutIcon from "@mui/icons-material/Logout";

import { signOut } from "@/auth";
import { SubmitButton } from "@/components/forms/submit-button";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/common";

export async function SignOutButton() {
  const language = getAppLanguage();

  const {
    layout: { sign_out_button_text },
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
        variant="contained"
        color="inherit"
        startIcon={<LogoutIcon color="error" />}
      >
        {sign_out_button_text}
      </SubmitButton>
    </form>
  );
}
