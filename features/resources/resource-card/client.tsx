import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import { NotFound } from "@/components/templates/not-found";
import { Dictionary } from "@/internationalization/dictionaries/resources";
import { SupportedLanguage } from "@/internationalization/types";

import { Resource } from "./types";

export type ClientResourceCardDictionary = Pick<
  Dictionary,
  "model" | "not_found" | "resource_card"
>;

export interface ClientResourceCardProps {
  resource: Resource | null;
  language: SupportedLanguage;
  dictionary: ClientResourceCardDictionary;
}

export const ClientResourceCard: React.FC<ClientResourceCardProps> = ({
  resource,
  language,
  dictionary,
}) => {
  if (!resource) {
    return (
      <Paper sx={{ placeContent: "center", height: "100%" }}>
        <NotFound
          heading={dictionary.not_found.heading}
          description={dictionary.not_found.description}
        />
      </Paper>
    );
  }

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardHeader subheader={dictionary.resource_card.heading} />

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
              primary={dictionary.model.brand}
              secondary={resource.brand}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={dictionary.model.model}
              secondary={resource.model}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={dictionary.model.serial}
              secondary={resource.serial}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={dictionary.model.createdAt}
              secondary={new Date(resource.createdAt).toLocaleString(language)}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={dictionary.model.updatedAt}
              secondary={new Date(resource.updatedAt).toLocaleString(language)}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};
