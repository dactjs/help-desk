"use client";

import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

import { FormTextField } from "@/components/forms/form-text-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { useFormAction } from "@/hooks/use-form-action";
import { Dictionary } from "@/internationalization/dictionaries/auth";

import { submit } from "../../_actions/submit";

type SignInFormDictionary = Pick<Dictionary, "sign_in_page">;

export interface SignInFormProps {
  dictionary: SignInFormDictionary;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  dictionary: {
    sign_in_page: {
      username_input_label,
      password_input_label,
      submit_button_text,
    },
  },
}) => {
  const { state, action } = useFormAction({ action: submit });

  return (
    <Stack component="form" action={action} spacing={2}>
      <FormTextField
        required
        fullWidth
        autoComplete="username"
        name="username"
        label={username_input_label}
        error={Boolean(state.errors.fields?.username)}
        helperText={state.errors.fields?.username}
      />

      <FormTextField
        required
        fullWidth
        type="password"
        autoComplete="current-password"
        name="password"
        label={password_input_label}
        error={Boolean(state.errors.fields?.password)}
        helperText={state.errors.fields?.password}
      />

      <SubmitButton fullWidth type="submit" variant="contained">
        {submit_button_text}
      </SubmitButton>

      {state.errors.server && (
        <Alert severity="error">{state.errors.server}</Alert>
      )}
    </Stack>
  );
};
