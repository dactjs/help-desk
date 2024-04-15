"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { useSnackbar } from "notistack";

import { FormTextField } from "@/components/forms/form-text-field";
import { TicketServiceCategoryAutocomplete } from "@/components/forms/ticket-service-category-autocomplete";
import { TicketServiceCategory } from "@/components/forms/ticket-service-category-autocomplete/types";
import { SubmitButton } from "@/components/forms/submit-button";
import { useFormAction } from "@/hooks/use-form-action";
import { Dictionary } from "@/internationalization/dictionaries/tickets";
import { SupportedLanguage } from "@/internationalization/types";

import { submit } from "../../_actions/submit";

type CreateTicketServiceFormDictionary = Pick<
  Dictionary,
  "create_ticket_service_page"
>;

export interface CreateTicketServiceFormProps {
  language: SupportedLanguage;
  dictionary: CreateTicketServiceFormDictionary;
}

export const CreateTicketServiceForm: React.FC<
  CreateTicketServiceFormProps
> = ({ language, dictionary: { create_ticket_service_page } }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { state, action } = useFormAction({
    action: submit,
    onComplete: () => {
      enqueueSnackbar(
        create_ticket_service_page["actions--created-successfully"],
        { variant: "success" }
      );

      redirect(`/${language}/admin/tickets/services`);
    },
  });

  const [category, set] = useState<TicketServiceCategory | null>(null);

  return (
    <Stack component="form" autoComplete="off" action={action} spacing={2}>
      {category && <input type="hidden" name="category" value={category.id} />}

      <TicketServiceCategoryAutocomplete
        required
        fullWidth
        value={category}
        onChange={(_, value) => set(value as TicketServiceCategory)}
        label={create_ticket_service_page.category_input_label}
        error={Boolean(state.errors.fields?.category)}
        helperText={state.errors.fields?.category}
      />

      <FormTextField
        required
        fullWidth
        autoComplete="off"
        name="name"
        label={create_ticket_service_page.name_input_label}
        error={Boolean(state.errors.fields?.name)}
        helperText={state.errors.fields?.name}
      />

      <SubmitButton fullWidth type="submit" variant="contained">
        {create_ticket_service_page.submit_button_text}
      </SubmitButton>

      {state.errors.server && (
        <Alert severity="error">{state.errors.server}</Alert>
      )}
    </Stack>
  );
};
