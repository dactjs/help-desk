import Link from "next/link";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Launch from "@mui/icons-material/Launch";

import { NotFound } from "@/components/templates/not-found";
import { Dictionary } from "@/internationalization/dictionaries/resources";
import { SupportedLanguage } from "@/internationalization/types";

import { Resource } from "./types";

export interface ClientResourceCardProps {
  resource: Resource | null;
  language: SupportedLanguage;
  dictionary: Pick<
    Dictionary,
    "resource_model" | "resource_card" | "not_found"
  >;
}

export function ClientResourceCard({
  resource,
  language,
  dictionary: { resource_model, resource_card, not_found },
}: ClientResourceCardProps) {
  if (!resource) {
    return (
      <Paper sx={{ placeContent: "center", height: "100%" }}>
        <NotFound
          heading={not_found.heading}
          description={not_found.description}
        />
      </Paper>
    );
  }

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardHeader
        subheader={resource_card.heading}
        action={
          <IconButton
            LinkComponent={Link}
            href={`/${language}/admin/resources/${resource.id}`}
          >
            <Launch />
          </IconButton>
        }
      />

      <CardContent
        sx={{
          height: "100%",
          overflowY: "auto",
          borderTop: 1,
          borderTopColor: "divider",
        }}
      >
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemText
              primary={resource_model.brand}
              secondary={resource.brand}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={resource_model.model}
              secondary={resource.model}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={resource_model.serial}
              secondary={resource.serial}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={resource_model.createdAt}
              secondary={new Date(resource.createdAt).toLocaleString(language)}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={resource_model.updatedAt}
              secondary={new Date(resource.updatedAt).toLocaleString(language)}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
