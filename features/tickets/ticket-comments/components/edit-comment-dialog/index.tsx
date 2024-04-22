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
import { Dictionary } from "@/internationalization/dictionaries/tickets";

import { updateTicketComment } from "../../actions/update";
import { TicketComment } from "../../types";

export interface EditTicketCommentDialogProps extends DialogProps {
  comment: TicketComment;
  dictionary: Pick<Dictionary, "edit_ticket_comment_dialog">;
  close: () => void;
}

export function EditTicketCommentDialog({
  comment,
  dictionary: { edit_ticket_comment_dialog },
  close: closeDialog,
  ...rest
}: EditTicketCommentDialogProps) {
  const { enqueueSnackbar } = useSnackbar();

  const { state, action } = useFormAction({
    action: updateTicketComment,
    onComplete: () =>
      enqueueSnackbar(
        edit_ticket_comment_dialog["actions--assign-successfully"],
        { variant: "success", onEntered: closeDialog }
      ),
  });

  return (
    <Dialog
      {...rest}
      onClose={() => closeDialog()}
      PaperProps={{ component: "form", action }}
    >
      <DialogTitle>{edit_ticket_comment_dialog.heading}</DialogTitle>

      <DialogContent
        dividers
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Stack spacing={2} useFlexGap>
          <HiddenInput name="comment" value={comment.id} />

          <FormTextField
            multiline
            required
            fullWidth
            autoComplete="off"
            name="content"
            defaultValue={comment.content}
            label={edit_ticket_comment_dialog.content_input_label}
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
          {edit_ticket_comment_dialog.submit_button_text}
        </SubmitButton>
      </DialogActions>
    </Dialog>
  );
}
