"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { useSnackbar } from "notistack";

import { UserAutocomplete } from "@/features/users/user-autocomplete";
import { User } from "@/features/users/user-autocomplete/types";
import { FormTextField } from "@/components/forms/form-text-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { useFormAction } from "@/hooks/use-form-action";
import { Dictionary } from "@/internationalization/dictionaries/resources";
import { SupportedLanguage } from "@/internationalization/types";

import { submit } from "../../_actions/submit";

export interface CreateResourceFormProps {
  language: SupportedLanguage;
  dictionary: Pick<Dictionary, "create_resource_form">;
}

export const CreateResourceForm: React.FC<CreateResourceFormProps> = ({
  language,
  dictionary: { create_resource_form },
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const { state, action } = useFormAction({
    action: submit,
    onComplete: () => {
      enqueueSnackbar(create_resource_form["actions--created-successfully"], {
        variant: "success",
      });

      redirect(`/${language}/admin/resources`);
    },
  });

  const [user, setUser] = useState<User | null>(null);

  return (
    <Stack component="form" autoComplete="off" action={action} spacing={2}>
      {user && <input type="hidden" name="user" value={user.id} />}

      <FormTextField
        required
        fullWidth
        autoComplete="off"
        name="brand"
        label={create_resource_form.brand_input_label}
        error={Boolean(state.errors.fields?.brand)}
        helperText={state.errors.fields?.brand}
      />

      <FormTextField
        required
        fullWidth
        autoComplete="off"
        name="model"
        label={create_resource_form.model_input_label}
        error={Boolean(state.errors.fields?.model)}
        helperText={state.errors.fields?.model}
      />

      <FormTextField
        required
        fullWidth
        autoComplete="off"
        name="serial"
        label={create_resource_form.serial_input_label}
        error={Boolean(state.errors.fields?.serial)}
        helperText={state.errors.fields?.serial}
      />

      <UserAutocomplete
        fullWidth
        value={user}
        onChange={(_, value) => setUser(value as User)}
        label={create_resource_form.user_input_label}
        error={Boolean(state.errors.fields?.user)}
        helperText={state.errors.fields?.user}
      />

      <SubmitButton fullWidth type="submit" variant="contained">
        {create_resource_form.submit_button_text}
      </SubmitButton>

      {state.errors.server && (
        <Alert severity="error">{state.errors.server}</Alert>
      )}
    </Stack>
  );
};
