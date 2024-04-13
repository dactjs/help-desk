import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { UserStatus, UserRole } from "@prisma/client";

import { NotFound } from "@/components/templates/not-found";
import { Dictionary } from "@/internationalization/dictionaries/users";
import { SupportedLanguage } from "@/internationalization/types";

import { User } from "./types";

export type ClientUserCardDictionary = Pick<
  Dictionary,
  "model" | "not_found" | "user_card"
>;

export interface ClientUserCardProps {
  variant: UserRole;
  user: User | null;
  language: SupportedLanguage;
  dictionary: ClientUserCardDictionary;
}

export const ClientUserCard: React.FC<ClientUserCardProps> = ({
  variant,
  user,
  language,
  dictionary,
}) => {
  const heading: Record<UserRole, string> = {
    ADMIN: dictionary.user_card["heading--admin"],
    TECHNICIAN: dictionary.user_card["heading--technician"],
    USER: dictionary.user_card["heading--user"],
  };

  const status: Record<UserStatus, string> = {
    ENABLED: dictionary.model["status--enabled"],
    DISABLED: dictionary.model["status--disabled"],
  };

  const role: Record<UserRole, string> = {
    ADMIN: dictionary.model["role--admin"],
    TECHNICIAN: dictionary.model["role--technician"],
    USER: dictionary.model["role--user"],
  };

  if (!user) {
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
      <CardHeader subheader={heading[variant]} />

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
              primary={dictionary.model.username}
              secondary={user.username}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={dictionary.model.name}
              secondary={user.name}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={dictionary.model.email}
              secondary={user.email}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={dictionary.model.status}
              secondary={status[user.status]}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={dictionary.model.role}
              secondary={role[user.role]}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={dictionary.model.createdAt}
              secondary={new Date(user.createdAt).toLocaleString(language)}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={dictionary.model.updatedAt}
              secondary={new Date(user.updatedAt).toLocaleString(language)}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};
