"use client";

import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { useSnackbar } from "notistack";

import { FormTextField } from "@/components/forms/form-text-field";
import { HiddenInput } from "@/components/forms/hidden-input";
import { SubmitButton } from "@/components/forms/submit-button";
import { useFormAction } from "@/hooks/use-form-action";
import { Dictionary } from "@/internationalization/dictionaries/users";
import { FormAction } from "@/types/form-action";

import { resetPassword } from "./actions/reset-password";
import { UserActionDialogType } from "./types";

export interface UserActionDialogProps extends DialogProps {
  type: UserActionDialogType;
  userId: string;
  dictionary: Pick<Dictionary, "user_action_dialog">;
}

export function UserActionDialog({
  type,
  userId,
  dictionary: { user_action_dialog },
  ...rest
}: UserActionDialogProps) {
  const heading: Record<UserActionDialogType, string> = {
    RESET_PASSWORD: user_action_dialog["heading--reset-password"],
  };

  const submit_button_text: Record<UserActionDialogType, string> = {
    RESET_PASSWORD: user_action_dialog["submit_button_text--reset-password"],
  };

  const action_successfully: Record<UserActionDialogType, string> = {
    RESET_PASSWORD: user_action_dialog["actions--reset-password-successfully"],
  };

  const actions: Record<UserActionDialogType, FormAction> = {
    RESET_PASSWORD: resetPassword,
  };

  const { enqueueSnackbar } = useSnackbar();

  const { state, action } = useFormAction({
    action: actions[type],
    onComplete: () =>
      enqueueSnackbar(action_successfully[type], { variant: "success" }),
  });

  return (
    <Dialog {...rest} PaperProps={{ component: "form", action }}>
      <DialogTitle>{heading[type]}</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2} useFlexGap>
          <HiddenInput name="user" value={userId} />

          <FormTextField
            required
            fullWidth
            type="password"
            autoComplete="off"
            name="password"
            label={user_action_dialog.password_input_label}
            error={Boolean(state.errors.fields?.password)}
            helperText={state.errors.fields?.password}
          />

          <FormTextField
            required
            fullWidth
            type="password"
            autoComplete="off"
            name="confirm_password"
            label={user_action_dialog.confirm_password_input_label}
            error={Boolean(state.errors.fields?.confirm_password)}
            helperText={state.errors.fields?.confirm_password}
          />

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
