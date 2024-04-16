"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { useSnackbar } from "notistack";

import { TicketServiceCategoryAutocomplete } from "@/features/tickets/ticket-service-category-autocomplete";
import { TicketServiceCategory } from "@/features/tickets/ticket-service-category-autocomplete/types";
import { FormTextField } from "@/components/forms/form-text-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { useFormAction } from "@/hooks/use-form-action";
import { Dictionary } from "@/internationalization/dictionaries/tickets";
import { SupportedLanguage } from "@/internationalization/types";

import { submit } from "../../_actions/submit";

export interface CreateTicketServiceFormProps {
  language: SupportedLanguage;
  dictionary: Pick<Dictionary, "create_ticket_service_form">;
}

export const CreateTicketServiceForm: React.FC<
  CreateTicketServiceFormProps
> = ({ language, dictionary: { create_ticket_service_form } }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { state, action } = useFormAction({
    action: submit,
    onComplete: () => {
      enqueueSnackbar(
        create_ticket_service_form["actions--created-successfully"],
        { variant: "success" }
      );

      redirect(`/${language}/admin/tickets/services`);
    },
  });

  const [category, setCategory] = useState<TicketServiceCategory | null>(null);

  return (
    <Stack component="form" autoComplete="off" action={action} spacing={2}>
      {category && <input type="hidden" name="category" value={category.id} />}

      <TicketServiceCategoryAutocomplete
        required
        fullWidth
        label={create_ticket_service_form.category_input_label}
        error={Boolean(state.errors.fields?.category)}
        helperText={state.errors.fields?.category}
        value={category}
        onChange={(_, value) => setCategory(value as TicketServiceCategory)}
      />

      <FormTextField
        required
        fullWidth
        autoComplete="off"
        name="name"
        label={create_ticket_service_form.name_input_label}
        error={Boolean(state.errors.fields?.name)}
        helperText={state.errors.fields?.name}
      />

      <SubmitButton fullWidth type="submit" variant="contained">
        {create_ticket_service_form.submit_button_text}
      </SubmitButton>

      {state.errors.server && (
        <Alert severity="error">{state.errors.server}</Alert>
      )}
    </Stack>
  );
};
