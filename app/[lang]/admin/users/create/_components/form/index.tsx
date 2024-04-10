"use client";

import { useFormState } from "react-dom";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

import { FormTextField } from "@/components/forms/form-text-field";
import { SubmitButton } from "@/components/forms/submit-button";

import { submit } from "../../_actions/submit";
import { CreateUserData } from "../../_types";

export interface CreateUserFormProps {
  username_input_label: string;
  email_input_label: string;
  password_input_label: string;
  name_input_label: string;
  submit_button_text: string;
}

export const CreateUserForm: React.FC<CreateUserFormProps> = ({
  username_input_label,
  email_input_label,
  password_input_label,
  name_input_label,
  submit_button_text,
}) => {
  const [state, action] = useFormState(submit, {
    errors: { api: null, fields: null },
  });

  const handleAction = (formData: FormData) => {
    const data: CreateUserData = {
      username: String(formData.get("username")),
      email: String(formData.get("email")),
      name: String(formData.get("name")),
      password: String(formData.get("password")),
    };

    return action(data);
  };

  return (
    <Stack
      component="form"
      autoComplete="off"
      action={handleAction}
      spacing={2}
    >
      <FormTextField
        required
        fullWidth
        autoComplete="off"
        name="username"
        label={username_input_label}
        error={Boolean(state.errors.fields?.username)}
        helperText={state.errors.fields?.username}
      />

      <FormTextField
        required
        fullWidth
        autoComplete="off"
        type="email"
        name="email"
        label={email_input_label}
        error={Boolean(state.errors.fields?.email)}
        helperText={state.errors.fields?.email}
      />

      <FormTextField
        required
        fullWidth
        autoComplete="off"
        type="password"
        name="password"
        label={password_input_label}
        error={Boolean(state.errors.fields?.password)}
        helperText={state.errors.fields?.password}
      />

      <FormTextField
        required
        fullWidth
        autoComplete="off"
        name="name"
        label={name_input_label}
        error={Boolean(state.errors.fields?.name)}
        helperText={state.errors.fields?.name}
      />

      <SubmitButton fullWidth type="submit" variant="contained">
        {submit_button_text}
      </SubmitButton>

      {state.errors.api && <Alert severity="error">{state.errors.api}</Alert>}
    </Stack>
  );
};
