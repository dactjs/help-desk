import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import { Dictionary } from "@/internationalization/dictionaries/logs";
import { SupportedLanguage } from "@/internationalization/types";

import { Log } from "../../types";

export interface LogDetailsDialogProps extends DialogProps {
  log: Log;
  language: SupportedLanguage;
  dictionary: Pick<Dictionary, "log" | "log_details_dialog">;
}

export function LogDetailsDialog({
  log,
  language,
  dictionary,
  ...rest
}: LogDetailsDialogProps) {
  return (
    <Dialog {...rest}>
      <DialogContent>
        <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <CardHeader subheader={dictionary.log_details_dialog.heading} />

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
                  primary={dictionary.log.model}
                  secondary={log.model}
                />
              </ListItem>

              <ListItem disablePadding>
                <ListItemText
                  primary={dictionary.log.operation}
                  secondary={log.operation}
                />
              </ListItem>

              <ListItem disablePadding>
                <ListItemText
                  primary={dictionary.log.metadata}
                  secondary={JSON.stringify(log.metadata, null, 2)}
                  secondaryTypographyProps={{
                    component: "pre",
                    sx: { whiteSpace: "pre-wrap" },
                  }}
                />
              </ListItem>

              <ListItem disablePadding>
                <ListItemText
                  primary={dictionary.log.user}
                  secondary={JSON.stringify(log.user, null, 2)}
                  secondaryTypographyProps={{
                    component: "pre",
                    sx: { whiteSpace: "pre-wrap" },
                  }}
                />
              </ListItem>

              <ListItem disablePadding>
                <ListItemText
                  primary={dictionary.log.timestamp}
                  secondary={new Date(log.timestamp).toLocaleString(language)}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
