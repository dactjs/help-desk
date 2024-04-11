"use client";

import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import { NotFound } from "@/components/templates/not-found";

import { Resource } from "./types";

export interface ClientResourceCardProps {
  resource: Resource | null;
}

export function ClientResourceCard({
  resource,
}: ClientResourceCardProps): React.ReactElement {
  if (!resource) {
    return (
      <Paper sx={{ height: "100%" }}>
        <NotFound
          heading="Recurso no encontrado"
          description="El servidor web no pudo encontrar el recurso solicitado"
        />
      </Paper>
    );
  }

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardHeader subheader="Detalles del recurso" />

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
            <ListItemText primary="Marca" secondary={resource.brand} />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText primary="Modelo" secondary={resource.model} />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary="Número de serie"
              secondary={resource.serial}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary="Fecha de creación"
              secondary={new Date(resource.createdAt).toLocaleString("es-do")}
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemText
              primary="Última actualización"
              secondary={new Date(resource.updatedAt).toLocaleString("es-do")}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
