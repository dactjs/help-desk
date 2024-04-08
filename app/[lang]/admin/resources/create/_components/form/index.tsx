"use client";

import { useFormState } from "react-dom";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

import { FormTextField } from "@/components/forms/form-text-field";
import { SubmitButton } from "@/components/forms/submit-button";

import { submit } from "../../_actions/submit";

export interface CreateResourceFormProps {
  brand_input_label: string;
  model_input_label: string;
  serial_input_label: string;
  submit_button_text: string;
}

export const CreateResourceForm: React.FC<CreateResourceFormProps> = ({
  brand_input_label,
  model_input_label,
  serial_input_label,
  submit_button_text,
}) => {
  const [state, action] = useFormState(submit, {
    errors: { api: null, fields: null },
  });

  return (
    <Stack component="form" autoComplete="off" action={action} spacing={2}>
      <FormTextField
        required
        fullWidth
        autoComplete="off"
        name="brand"
        label={brand_input_label}
        error={Boolean(state.errors.fields?.brand)}
        helperText={state.errors.fields?.brand}
      />

      <FormTextField
        required
        fullWidth
        autoComplete="off"
        name="model"
        label={model_input_label}
        error={Boolean(state.errors.fields?.model)}
        helperText={state.errors.fields?.model}
      />

      <FormTextField
        required
        fullWidth
        autoComplete="off"
        name="serial"
        label={serial_input_label}
        error={Boolean(state.errors.fields?.serial)}
        helperText={state.errors.fields?.serial}
      />

      <SubmitButton fullWidth type="submit" variant="contained">
        {submit_button_text}
      </SubmitButton>

      {state.errors.api && <Alert severity="error">{state.errors.api}</Alert>}
    </Stack>
  );
};
