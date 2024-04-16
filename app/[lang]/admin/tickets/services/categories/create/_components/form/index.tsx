"use client";

import { redirect } from "next/navigation";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { useSnackbar } from "notistack";

import { FormTextField } from "@/components/forms/form-text-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { useFormAction } from "@/hooks/use-form-action";
import { Dictionary } from "@/internationalization/dictionaries/tickets";
import { SupportedLanguage } from "@/internationalization/types";

import { submit } from "../../_actions/submit";

export interface CreateTicketServiceCategoryFormProps {
  language: SupportedLanguage;
  dictionary: Pick<Dictionary, "create_ticket_service_category_form">;
}

export const CreateTicketServiceCategoryForm: React.FC<
  CreateTicketServiceCategoryFormProps
> = ({ language, dictionary: { create_ticket_service_category_form } }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { state, action } = useFormAction({
    action: submit,
    onComplete: () => {
      enqueueSnackbar(
        create_ticket_service_category_form["actions--created-successfully"],
        { variant: "success" }
      );

      redirect(`/${language}/admin/tickets/services`);
    },
  });

  return (
    <Stack component="form" autoComplete="off" action={action} spacing={2}>
      <FormTextField
        required
        fullWidth
        autoComplete="off"
        name="name"
        label={create_ticket_service_category_form.name_input_label}
        error={Boolean(state.errors.fields?.name)}
        helperText={state.errors.fields?.name}
      />

      <SubmitButton fullWidth type="submit" variant="contained">
        {create_ticket_service_category_form.submit_button_text}
      </SubmitButton>

      {state.errors.server && (
        <Alert severity="error">{state.errors.server}</Alert>
      )}
    </Stack>
  );
};
