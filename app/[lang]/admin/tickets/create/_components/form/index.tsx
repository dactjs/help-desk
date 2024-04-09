"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { UserRole } from "@prisma/client";

import { FormTextField } from "@/components/forms/form-text-field";
import { UserAutocomplete } from "@/components/forms/user-autocomplete";
import { User } from "@/components/forms/user-autocomplete/types";
import { TicketServiceAutocomplete } from "@/components/forms/ticket-service-autocomplete";
import { TicketService } from "@/components/forms/ticket-service-autocomplete/types";
import { SubmitButton } from "@/components/forms/submit-button";

import { submit } from "../../_actions/submit";

export interface CreateTicketFormProps {
  issue_input_label: string;
  service_input_label: string;
  user_input_label: string;
  technician_input_label: string;
  submit_button_text: string;
}

export const CreateTicketForm: React.FC<CreateTicketFormProps> = ({
  issue_input_label,
  service_input_label,
  user_input_label,
  technician_input_label,
  submit_button_text,
}) => {
  const [state, action] = useFormState(submit, {
    errors: { api: null, fields: null },
  });

  const [service, setService] = useState<TicketService | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [technician, setTechnician] = useState<User | null>(null);

  const handleAction = (formData: FormData) => {
    if (!service || !user) return;

    formData.set("service", service.id);
    formData.set("user", user.id);

    if (technician) formData.set("technician", technician.id);

    return action(formData); // TODO: check
  };

  return (
    <Stack
      component="form"
      autoComplete="off"
      action={handleAction}
      spacing={2}
    >
      <TicketServiceAutocomplete
        required
        fullWidth
        value={service}
        onChange={(_, value) => setService(value as TicketService)}
        label={service_input_label}
        error={Boolean(state.errors.fields?.service)}
        helperText={state.errors.fields?.service}
      />

      <FormTextField
        multiline
        required
        fullWidth
        autoComplete="off"
        name="issue"
        label={issue_input_label}
        error={Boolean(state.errors.fields?.issue)}
        helperText={state.errors.fields?.issue}
      />

      <UserAutocomplete
        required
        fullWidth
        value={user}
        onChange={(_, value) => setUser(value as User)}
        label={user_input_label}
        error={Boolean(state.errors.fields?.user)}
        helperText={state.errors.fields?.user}
      />

      <UserAutocomplete
        fullWidth
        filters={{ roles: [UserRole.TECHNICIAN] }}
        value={technician}
        onChange={(_, value) => setTechnician(value as User)}
        label={technician_input_label}
        error={Boolean(state.errors.fields?.technician)}
        helperText={state.errors.fields?.technician}
      />

      <SubmitButton fullWidth type="submit" variant="contained">
        {submit_button_text}
      </SubmitButton>

      {state.errors.api && <Alert severity="error">{state.errors.api}</Alert>}
    </Stack>
  );
};
