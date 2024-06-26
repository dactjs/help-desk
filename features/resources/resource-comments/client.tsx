"use client";

import { useState } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionActions from "@mui/material/AccordionActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandIcon from "@mui/icons-material/ExpandMore";
import { useSnackbar } from "notistack";
import { useConfirm } from "material-ui-confirm";
import { subject } from "@casl/ability";

import { Can } from "@/auth/ability";
import { Empty } from "@/components/templates/empty";
import { replacePlaceholders } from "@/internationalization/utils/replace-placeholders";
import { Dictionary } from "@/internationalization/dictionaries/resources";
import { SupportedLanguage } from "@/internationalization/types";

import { AddResourceCommentDialog } from "./components/add-comment-dialog";
import { EditResourceCommentDialog } from "./components/edit-comment-dialog";
import { deleteResourceComment } from "./actions/delete";
import { ResourceComment } from "./types";

export interface ClientResourceCommentsProps {
  resourceId: string;
  comments: ResourceComment[];
  language: SupportedLanguage;
  dictionary: Pick<
    Dictionary,
    | "resource_comments"
    | "add_resource_comment_dialog"
    | "edit_resource_comment_dialog"
  >;
}

export function ClientResourceComments({
  resourceId,
  comments,
  language,
  dictionary: {
    resource_comments,
    add_resource_comment_dialog,
    edit_resource_comment_dialog,
  },
}: ClientResourceCommentsProps) {
  const { enqueueSnackbar } = useSnackbar();

  const confirm = useConfirm();

  const [isAddResourceCommentDialogOpen, setIsAddResourceCommentDialogOpen] =
    useState<boolean>(false);

  const [comment, setComment] = useState<ResourceComment | null>(null);

  const handleDelete = (id: string) => {
    confirm()
      .then(async () => {
        try {
          await deleteResourceComment(id);
        } catch (error) {
          if (error instanceof Error) {
            enqueueSnackbar(error.message, {
              variant: "error",
              style: { whiteSpace: "pre-line" },
            });
          }
        }
      })
      .catch(() => null);
  };

  return (
    <>
      {isAddResourceCommentDialogOpen && (
        <AddResourceCommentDialog
          fullWidth
          resourceId={resourceId}
          dictionary={{ add_resource_comment_dialog }}
          open={isAddResourceCommentDialogOpen}
          close={() => setIsAddResourceCommentDialogOpen(false)}
        />
      )}

      {comment && (
        <EditResourceCommentDialog
          fullWidth
          comment={comment}
          dictionary={{ edit_resource_comment_dialog }}
          open={Boolean(comment)}
          close={() => setComment(null)}
        />
      )}

      <Paper sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <AppBar position="static" sx={{ borderRadius: "inherit" }}>
          <Toolbar sx={{ justifyContent: "space-between", gap: 1 }}>
            <Typography component="h2" variant="body1" fontWeight="bolder">
              {resource_comments.heading}
            </Typography>

            <Can I="create" a="ResourceComment">
              <IconButton
                color="inherit"
                onClick={() => setIsAddResourceCommentDialogOpen(true)}
              >
                <AddIcon />
              </IconButton>
            </Can>
          </Toolbar>
        </AppBar>

        <Stack
          sx={{
            justifyContent: comments.length > 0 ? "flex-start" : "center",
            height: "100%",
            padding: 2,
            overflowY: "auto",
          }}
        >
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Accordion key={comment.id}>
                <AccordionSummary expandIcon={<ExpandIcon />}>
                  <Typography
                    component="pre"
                    sx={{
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {comment.content}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Typography variant="caption" color="text.secondary">
                    {replacePlaceholders(resource_comments.written_by, {
                      name: comment.writtenBy.name,
                      timestamp: comment.updatedAt.toLocaleString(language),
                    })}
                  </Typography>
                </AccordionDetails>

                <AccordionActions>
                  <Can I="delete" this={subject("ResourceComment", comment)}>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      endIcon={<DeleteIcon />}
                      onClick={() => handleDelete(comment.id)}
                    >
                      {resource_comments["actions--delete"]}
                    </Button>
                  </Can>

                  <Can
                    I="update"
                    this={subject("ResourceComment", comment)}
                    field="content"
                  >
                    <Button
                      variant="contained"
                      size="small"
                      endIcon={<EditIcon />}
                      onClick={() => setComment(comment)}
                    >
                      {resource_comments["actions--edit"]}
                    </Button>
                  </Can>
                </AccordionActions>
              </Accordion>
            ))
          ) : (
            <Empty caption={resource_comments["empty-caption"]} />
          )}
        </Stack>
      </Paper>
    </>
  );
}
