import Link from "next/link";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import LaunchIcon from "@mui/icons-material/Launch";
import { ResourceStatus } from "@prisma/client";

import { NotFound } from "@/components/templates/not-found";
import { Dictionary } from "@/internationalization/dictionaries/resources";
import { SupportedLanguage } from "@/internationalization/types";

import { Resource } from "./types";

export interface ClientResourceCardProps {
  resource: Resource | null;
  href: string | null;
  language: SupportedLanguage;
  dictionary: Pick<
    Dictionary,
    "resource_model" | "resource_card" | "not_found"
  >;
}

export function ClientResourceCard({
  resource,
  href,
  language,
  dictionary: { resource_model, resource_card, not_found },
}: ClientResourceCardProps) {
  const status: Record<ResourceStatus, string> = {
    UNASSIGNED: resource_model["status--unassigned"],
    ASSIGNED: resource_model["status--assigned"],
    REPAIR_IN_PROGRESS: resource_model["status--repair-in-progress"],
    DISCARDED: resource_model["status--discarded"],
  };

  if (!resource) {
    return (
      <Paper sx={{ display: "flex", placeContent: "center", height: "100%" }}>
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
          href && (
            <IconButton LinkComponent={Link} href={href}>
              <LaunchIcon />
            </IconButton>
          )
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
              primary={resource_model.status}
              secondary={status[resource.status]}
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
