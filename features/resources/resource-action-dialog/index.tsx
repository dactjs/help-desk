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

import { UserAutocomplete } from "@/features/users/user-autocomplete";
import { User } from "@/features/users/user-autocomplete/types";
import { FormTextField } from "@/components/forms/form-text-field";
import { HiddenInput } from "@/components/forms/hidden-input";
import { SubmitButton } from "@/components/forms/submit-button";
import { useFormAction } from "@/hooks/use-form-action";
import { Dictionary } from "@/internationalization/dictionaries/resources";
import { FormAction } from "@/types/form-action";

import { input } from "./actions/input";
import { assign } from "./actions/assign";
import { transfer } from "./actions/transfer";
import { unassign } from "./actions/unassign";
import { repair } from "./actions/repair";
import { output } from "./actions/output";
import { ResourceActionDialogType } from "./types";

export interface ResourceActionDialogProps extends DialogProps {
  type: ResourceActionDialogType;
  resourceId: string;
  origin: User | null;
  dictionary: Pick<Dictionary, "resource_action_dialog">;
  close: () => void;
}

export function ResourceActionDialog({
  type,
  resourceId,
  origin,
  dictionary: { resource_action_dialog },
  close: closeDialog,
  ...rest
}: ResourceActionDialogProps) {
  const heading: Record<ResourceActionDialogType, string> = {
    INPUT: resource_action_dialog["heading--input"],
    ASSIGN: resource_action_dialog["heading--assign"],
    TRANSFER: resource_action_dialog["heading--transfer"],
    UNASSIGN: resource_action_dialog["heading--unassign"],
    REPAIR: resource_action_dialog["heading--repair"],
    OUTPUT: resource_action_dialog["heading--output"],
  };

  const context_text = {
    INPUT: resource_action_dialog["context_text--input"],
    UNASSIGN: resource_action_dialog["context_text--unassign"],
    REPAIR: resource_action_dialog["context_text--repair"],
    OUTPUT: resource_action_dialog["context_text--output"],
  } as const;

  const submit_button_text: Record<ResourceActionDialogType, string> = {
    INPUT: resource_action_dialog["submit_button_text--input"],
    ASSIGN: resource_action_dialog["submit_button_text--assign"],
    TRANSFER: resource_action_dialog["submit_button_text--transfer"],
    UNASSIGN: resource_action_dialog["submit_button_text--unassign"],
    REPAIR: resource_action_dialog["submit_button_text--repair"],
    OUTPUT: resource_action_dialog["submit_button_text--output"],
  };

  const action_successfully: Record<ResourceActionDialogType, string> = {
    INPUT: resource_action_dialog["actions--input-successfully"],
    ASSIGN: resource_action_dialog["actions--assign-successfully"],
    TRANSFER: resource_action_dialog["actions--transfer-successfully"],
    UNASSIGN: resource_action_dialog["actions--unassign-successfully"],
    REPAIR: resource_action_dialog["actions--repair-successfully"],
    OUTPUT: resource_action_dialog["actions--output-successfully"],
  };

  const actions: Record<ResourceActionDialogType, FormAction> = {
    INPUT: input,
    ASSIGN: assign,
    TRANSFER: transfer,
    UNASSIGN: unassign,
    REPAIR: repair,
    OUTPUT: output,
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
          ResourceActionDialogType.INPUT,
          ResourceActionDialogType.UNASSIGN,
          ResourceActionDialogType.REPAIR,
          ResourceActionDialogType.OUTPUT,
        ].includes(type as keyof typeof context_text) && (
          <DialogContentText>
            {context_text[type as keyof typeof context_text]}
          </DialogContentText>
        )}

        <Stack spacing={2} useFlexGap>
          <HiddenInput name="resource" value={resourceId} />
          <HiddenInput name="destination" value={destination?.id || null} />

          {(
            [
              ResourceActionDialogType.TRANSFER,
              ResourceActionDialogType.UNASSIGN,
            ] as ResourceActionDialogType[]
          ).includes(type) && (
            <FormTextField
              required
              fullWidth
              disabled
              label={resource_action_dialog.origin_field_label}
              value={`${origin?.name} (${origin?.username})`}
            />
          )}

          {(
            [
              ResourceActionDialogType.ASSIGN,
              ResourceActionDialogType.TRANSFER,
            ] as ResourceActionDialogType[]
          ).includes(type) && (
            <UserAutocomplete
              required
              fullWidth
              getOptionDisabled={(option) => option.id === origin?.id}
              value={destination}
              onChange={(_, value) => setDestination(value as User)}
              label={resource_action_dialog.destination_field_label}
              error={Boolean(state.errors.fields?.destination)}
              helperText={state.errors.fields?.destination}
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
