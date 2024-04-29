"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { useSnackbar } from "notistack";

import { TicketServiceAutocomplete } from "@/features/tickets/ticket-service-autocomplete";
import { TicketService } from "@/features/tickets/ticket-service-autocomplete/types";
import { FormTextField } from "@/components/forms/form-text-field";
import { HiddenInput } from "@/components/forms/hidden-input";
import { SubmitButton } from "@/components/forms/submit-button";
import { useFormAction } from "@/hooks/use-form-action";
import { Dictionary } from "@/internationalization/dictionaries/tickets";
import { SupportedLanguage } from "@/internationalization/types";

import { submit } from "../../_actions/submit";

export interface CreateTicketFormProps {
  language: SupportedLanguage;
  dictionary: Pick<Dictionary, "create_ticket_form">;
}

export function CreateTicketForm({
  language,
  dictionary: { create_ticket_form },
}: CreateTicketFormProps) {
  const { enqueueSnackbar } = useSnackbar();

  const { state, action } = useFormAction({
    action: submit,
    onComplete: () => {
      enqueueSnackbar(create_ticket_form["actions--created-successfully"], {
        variant: "success",
      });

      redirect(`/${language}/dashboard`);
    },
  });

  const [service, setService] = useState<TicketService | null>(null);

  return (
    <Stack
      component="form"
      autoComplete="off"
      action={action}
      spacing={2}
      useFlexGap
    >
      <HiddenInput name="service" value={service?.id || null} />

      <TicketServiceAutocomplete
        required
        fullWidth
        value={service}
        onChange={(_, value) => setService(value as TicketService)}
        label={create_ticket_form.service_field_label}
        error={Boolean(state.errors.fields?.service)}
        helperText={state.errors.fields?.service}
      />

      <FormTextField
        multiline
        required
        fullWidth
        autoComplete="off"
        name="issue"
        label={create_ticket_form.issue_field_label}
        error={Boolean(state.errors.fields?.issue)}
        helperText={state.errors.fields?.issue}
      />

      <SubmitButton fullWidth type="submit" variant="contained">
        {create_ticket_form.submit_button_text}
      </SubmitButton>

      {state.errors.server && (
        <Alert severity="error">{state.errors.server}</Alert>
      )}
    </Stack>
  );
}
