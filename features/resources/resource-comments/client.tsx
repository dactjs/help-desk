"use client";

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

import { Empty } from "@/components/templates/empty";
import { replacePlaceholders } from "@/internationalization/utils/replace-placeholders";
import { Dictionary } from "@/internationalization/dictionaries/resources";
import { SupportedLanguage } from "@/internationalization/types";

import { ResourceComment } from "./types";

export interface ClientResourceCommentsProps {
  comments: ResourceComment[];
  language: SupportedLanguage;
  dictionary: Pick<Dictionary, "resource_comments">;
}

export function ClientResourceComments({
  comments,
  language,
  dictionary: { resource_comments },
}: ClientResourceCommentsProps) {
  return (
    <Paper sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <AppBar position="static" sx={{ borderRadius: "inherit" }}>
        <Toolbar sx={{ justifyContent: "space-between", gap: 1 }}>
          <Typography component="h2" variant="body1" fontWeight="bolder">
            {resource_comments.heading}
          </Typography>

          <IconButton color="inherit">
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Stack
        sx={{
          justifyContent: comments.length > 0 ? "flex-start" : "center",
          height: "100%",
          overflowY: "auto",
        }}
      >
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Accordion key={comment.id}>
              <AccordionSummary>
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
                    date: comment.updatedAt.toLocaleString(language),
                  })}
                </Typography>
              </AccordionDetails>

              <AccordionActions>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  endIcon={<DeleteIcon />}
                >
                  {resource_comments["actions--delete"]}
                </Button>

                <Button variant="contained" size="small" endIcon={<EditIcon />}>
                  {resource_comments["actions--edit"]}
                </Button>
              </AccordionActions>
            </Accordion>
          ))
        ) : (
          <Empty caption={resource_comments["empty-caption"]} />
        )}
      </Stack>
    </Paper>
  );
}
