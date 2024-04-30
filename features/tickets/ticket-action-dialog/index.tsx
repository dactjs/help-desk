"use client";

import { useState } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { useSnackbar } from "notistack";
import { UserRole } from "@prisma/client";

import { UserAutocomplete } from "@/features/users/user-autocomplete";
import { User } from "@/features/users/user-autocomplete/types";
import { FormTextField } from "@/components/forms/form-text-field";
import { HiddenInput } from "@/components/forms/hidden-input";
import { SubmitButton } from "@/components/forms/submit-button";
import { useFormAction } from "@/hooks/use-form-action";
import { Dictionary } from "@/internationalization/dictionaries/tickets";
import { FormAction } from "@/types/form-action";

import { take } from "./actions/take";
import { assign } from "./actions/assign";
import { transfer } from "./actions/transfer";
import { open } from "./actions/open";
import { resolve } from "./actions/resolve";
import { close } from "./actions/close";
import { cancel } from "./actions/cancel";
import { TicketActionDialogType } from "./types";

export interface TicketActionDialogProps extends DialogProps {
  type: TicketActionDialogType;
  ticketId: string;
  origin: User | null;
  dictionary: Pick<Dictionary, "ticket_action_dialog">;
  close: () => void;
}

export function TicketActionDialog({
  type,
  ticketId,
  origin,
  dictionary: { ticket_action_dialog },
  close: closeDialog,
  ...rest
}: TicketActionDialogProps) {
  const heading: Record<TicketActionDialogType, string> = {
    TAKE: ticket_action_dialog["heading--take"],
    ASSIGN: ticket_action_dialog["heading--assign"],
    TRANSFER: ticket_action_dialog["heading--transfer"],
    OPEN: ticket_action_dialog["heading--open"],
    RESOLVE: ticket_action_dialog["heading--resolve"],
    CLOSE: ticket_action_dialog["heading--close"],
    CANCEL: ticket_action_dialog["heading--cancel"],
  };

  const context_text = {
    TAKE: ticket_action_dialog["context_text--take"],
    OPEN: ticket_action_dialog["context_text--open"],
    CLOSE: ticket_action_dialog["context_text--close"],
  } as const;

  const submit_button_text: Record<TicketActionDialogType, string> = {
    TAKE: ticket_action_dialog["submit_button_text--take"],
    ASSIGN: ticket_action_dialog["submit_button_text--assign"],
    TRANSFER: ticket_action_dialog["submit_button_text--transfer"],
    OPEN: ticket_action_dialog["submit_button_text--open"],
    RESOLVE: ticket_action_dialog["submit_button_text--resolve"],
    CLOSE: ticket_action_dialog["submit_button_text--close"],
    CANCEL: ticket_action_dialog["submit_button_text--cancel"],
  };

  const action_successfully: Record<TicketActionDialogType, string> = {
    TAKE: ticket_action_dialog["actions--take-successfully"],
    ASSIGN: ticket_action_dialog["actions--assign-successfully"],
    TRANSFER: ticket_action_dialog["actions--transfer-successfully"],
    OPEN: ticket_action_dialog["actions--open-successfully"],
    RESOLVE: ticket_action_dialog["actions--resolve-successfully"],
    CLOSE: ticket_action_dialog["actions--close-successfully"],
    CANCEL: ticket_action_dialog["actions--cancel-successfully"],
  };

  const actions: Record<TicketActionDialogType, FormAction> = {
    TAKE: take,
    ASSIGN: assign,
    TRANSFER: transfer,
    OPEN: open,
    RESOLVE: resolve,
    CLOSE: close,
    CANCEL: cancel,
  };

  const { enqueueSnackbar } = useSnackbar();

  const { state, action } = useFormAction({
    action: actions[type],
    onComplete: () =>
      enqueueSnackbar(action_successfully[type], {
        variant: "success",
        onEntered: closeDialog,
      }),
  });

  const [destination, setDestination] = useState<User | null>(null);

  return (
    <Dialog
      {...rest}
      onClose={() => closeDialog()}
      PaperProps={{ component: "form", action }}
    >
      <DialogTitle>{heading[type]}</DialogTitle>

      <DialogContent
        dividers
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {[
          TicketActionDialogType.TAKE,
          TicketActionDialogType.OPEN,
          TicketActionDialogType.CLOSE,
        ].includes(type as keyof typeof context_text) && (
          <DialogContentText>
            {context_text[type as keyof typeof context_text]}
          </DialogContentText>
        )}

        <Stack spacing={2} useFlexGap>
          <HiddenInput name="ticket" value={ticketId} />
          <HiddenInput name="destination" value={destination?.id || null} />

          {type === TicketActionDialogType.TRANSFER && (
            <FormTextField
              required
              fullWidth
              disabled
              label={ticket_action_dialog.origin_field_label}
              value={`${origin?.name} (${origin?.username})`}
            />
          )}

          {(
            [
              TicketActionDialogType.ASSIGN,
              TicketActionDialogType.TRANSFER,
            ] as TicketActionDialogType[]
          ).includes(type) && (
            <UserAutocomplete
              required
              fullWidth
              filters={{ roles: [UserRole.TECHNICIAN] }}
              getOptionDisabled={(option) => option.id === origin?.id}
              value={destination}
              onChange={(_, value) => setDestination(value as User)}
              label={ticket_action_dialog.destination_field_label}
              error={Boolean(state.errors.fields?.destination)}
              helperText={state.errors.fields?.destination}
            />
          )}

          {(
            [
              TicketActionDialogType.RESOLVE,
              TicketActionDialogType.CANCEL,
            ] as TicketActionDialogType[]
          ).includes(type) && (
            <FormTextField
              multiline
              required
              fullWidth
              autoComplete="off"
              name="solution"
              label={ticket_action_dialog.solution_field_label}
              error={Boolean(state.errors.fields?.solution)}
              helperText={state.errors.fields?.solution}
            />
          )}

          {state.errors.server && (
            <Alert severity="error">{state.errors.server}</Alert>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <SubmitButton type="submit" variant="contained">
          {submit_button_text[type]}
        </SubmitButton>
      </DialogActions>
    </Dialog>
  );
}
