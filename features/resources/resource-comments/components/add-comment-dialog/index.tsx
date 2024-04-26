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
import { Dictionary } from "@/internationalization/dictionaries/resources";

import { createResourceComment } from "../../actions/create";

export interface AddResourceCommentDialogProps extends DialogProps {
  resourceId: string;
  dictionary: Pick<Dictionary, "add_resource_comment_dialog">;
  close: () => void;
}

export function AddResourceCommentDialog({
  resourceId,
  dictionary: { add_resource_comment_dialog },
  close: closeDialog,
  ...rest
}: AddResourceCommentDialogProps) {
  const { enqueueSnackbar } = useSnackbar();

  const { state, action } = useFormAction({
    action: createResourceComment,
    onComplete: () =>
      enqueueSnackbar(
        add_resource_comment_dialog["actions--assign-successfully"],
        { variant: "success", onEntered: closeDialog }
      ),
  });

  return (
    <Dialog
      {...rest}
      onClose={() => closeDialog()}
      PaperProps={{ component: "form", action }}
    >
      <DialogTitle>{add_resource_comment_dialog.heading}</DialogTitle>

      <DialogContent
        dividers
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Stack spacing={2} useFlexGap>
          <HiddenInput name="resource" value={resourceId} />

          <FormTextField
            multiline
            required
            fullWidth
            autoComplete="off"
            name="content"
            label={add_resource_comment_dialog.content_field_label}
            error={Boolean(state.errors.fields?.content)}
            helperText={state.errors.fields?.content}
          />

          {state.errors.server && (
            <Alert severity="error">{state.errors.server}</Alert>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <SubmitButton type="submit" variant="contained">
          {add_resource_comment_dialog.submit_button_text}
        </SubmitButton>
      </DialogActions>
    </Dialog>
  );
}
