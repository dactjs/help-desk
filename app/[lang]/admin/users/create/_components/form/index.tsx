"use client";

import { redirect } from "next/navigation";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { useSnackbar } from "notistack";

import { FormTextField } from "@/components/forms/form-text-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { useFormAction } from "@/hooks/use-form-action";
import { Dictionary } from "@/internationalization/dictionaries/users";
import { SupportedLanguage } from "@/internationalization/types";

import { submit } from "../../_actions/submit";

export interface CreateUserFormProps {
  language: SupportedLanguage;
  dictionary: Pick<Dictionary, "create_user_form">;
}

export const CreateUserForm: React.FC<CreateUserFormProps> = ({
  language,
  dictionary: { create_user_form },
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const { state, action } = useFormAction({
    action: submit,
    onComplete: () => {
      enqueueSnackbar(create_user_form["actions--created-successfully"], {
        variant: "success",
      });

      redirect(`/${language}/admin/users`);
    },
  });

  return (
    <Stack component="form" autoComplete="off" action={action} spacing={2}>
      <FormTextField
        required
        fullWidth
        autoComplete="off"
        name="name"
        label={create_user_form.name_input_label}
        error={Boolean(state.errors.fields?.name)}
        helperText={state.errors.fields?.name}
      />

      <FormTextField
        required
        fullWidth
        autoComplete="off"
        name="username"
        label={create_user_form.username_input_label}
        error={Boolean(state.errors.fields?.username)}
        helperText={state.errors.fields?.username}
      />

      <FormTextField
        required
        fullWidth
        autoComplete="off"
        type="email"
        name="email"
        label={create_user_form.email_input_label}
        error={Boolean(state.errors.fields?.email)}
        helperText={state.errors.fields?.email}
      />

      <FormTextField
        required
        fullWidth
        autoComplete="off"
        type="password"
        name="password"
        label={create_user_form.password_input_label}
        error={Boolean(state.errors.fields?.password)}
        helperText={state.errors.fields?.password}
      />

      <SubmitButton fullWidth type="submit" variant="contained">
        {create_user_form.submit_button_text}
      </SubmitButton>

      {state.errors.server && (
        <Alert severity="error">{state.errors.server}</Alert>
      )}
    </Stack>
  );
};
