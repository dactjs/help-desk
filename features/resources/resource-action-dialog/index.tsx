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
  dictionary: Pick<Dictionary, "resource_action_dialog">;
}

export function ResourceActionDialog({
  type,
  resourceId,
  dictionary: { resource_action_dialog },
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
      enqueueSnackbar(action_successfully[type], { variant: "success" }),
  });

  const [destination, setDestination] = useState<User | null>(null);

  return (
    <Dialog {...rest} PaperProps={{ component: "form", action }}>
      <DialogTitle>{heading[type]}</DialogTitle>

      <DialogContent dividers>
        <input type="hidden" name="resource" value={resourceId} />

        {destination && (
          <input type="hidden" name="destination" value={destination.id} />
        )}

        {type === ResourceActionDialogType.INPUT && (
          <DialogContentText>
            {resource_action_dialog["context_text--input"]}
          </DialogContentText>
        )}

        {type === ResourceActionDialogType.UNASSIGN && (
          <DialogContentText>
            {resource_action_dialog["context_text--unassign"]}
          </DialogContentText>
        )}

        {type === ResourceActionDialogType.OUTPUT && (
          <DialogContentText>
            {resource_action_dialog["context_text--output"]}
          </DialogContentText>
        )}

        <Stack spacing={2}>
          {[
            ResourceActionDialogType.ASSIGN,
            ResourceActionDialogType.TRANSFER,
          ].some((current) => current === type) && (
            <UserAutocomplete
              required
              fullWidth
              value={destination}
              onChange={(_, value) => setDestination(value as User)}
              label={resource_action_dialog.destination_input_label}
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
