"use client";

import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import { NotFound } from "@/components/templates/not-found";

import { User } from "./types";

export interface ClientUserCardProps {
  user: User | null;
}

export function ClientUserCard({
  user,
}: ClientUserCardProps): React.ReactElement {
  if (!user) {
    return (
      <Paper sx={{ height: "100%" }}>
        <NotFound
          heading="Usuario no encontrado"
          description="El servidor web no pudo encontrar el usuario solicitado"
        />
      </Paper>
    );
  }

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardHeader subheader="Detalles del usuario" />

      <CardContent
        sx={{
          height: "100%",
          overflowY: "auto",
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemText primary="Usuario" secondary={user.username} />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText primary="Nombre" secondary={user.name} />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText primary="Correo electrónico" secondary={user.email} />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText primary="Estado" secondary={user.status} />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText primary="Roles" secondary={user.role} />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary="Fecha de creación"
              secondary={new Date(user.createdAt).toLocaleString("es-do")}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary="Última actualización"
              secondary={new Date(user.updatedAt).toLocaleString("es-do")}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
