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
import { UserStatus, UserRole } from "@prisma/client";

import { NotFound } from "@/components/templates/not-found";
import { Dictionary } from "@/internationalization/dictionaries/users";
import { SupportedLanguage } from "@/internationalization/types";

import { User } from "./types";

export interface ClientUserCardProps {
  variant: UserRole;
  user: User | null;
  language: SupportedLanguage;
  dictionary: Pick<Dictionary, "user_model" | "user_card" | "not_found">;
}

export function ClientUserCard({
  variant,
  user,
  language,
  dictionary: { user_model, user_card, not_found },
}: ClientUserCardProps) {
  const heading: Record<UserRole, string> = {
    ADMIN: user_card["heading--admin"],
    TECHNICIAN: user_card["heading--technician"],
    USER: user_card["heading--user"],
  };

  const status: Record<UserStatus, string> = {
    ENABLED: user_model["status--enabled"],
    DISABLED: user_model["status--disabled"],
  };

  const role: Record<UserRole, string> = {
    ADMIN: user_model["role--admin"],
    TECHNICIAN: user_model["role--technician"],
    USER: user_model["role--user"],
  };

  if (!user) {
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
        subheader={heading[variant]}
        action={
          <IconButton
            LinkComponent={Link}
            href={`/${language}/admin/users/${user.id}`}
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
              primary={user_model.username}
              secondary={user.username}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText primary={user_model.name} secondary={user.name} />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText primary={user_model.email} secondary={user.email} />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={user_model.status}
              secondary={status[user.status]}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={user_model.role}
              secondary={role[user.role]}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={user_model.createdAt}
              secondary={new Date(user.createdAt).toLocaleString(language)}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary={user_model.updatedAt}
              secondary={new Date(user.updatedAt).toLocaleString(language)}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
