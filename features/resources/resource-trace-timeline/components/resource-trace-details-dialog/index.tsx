import Link from "next/link";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LaunchIcon from "@mui/icons-material/Launch";
import { ResourceTraceType } from "@prisma/client";

import { replacePlaceholders } from "@/internationalization/utils/replace-placeholders";
import { Dictionary } from "@/internationalization/dictionaries/resources";
import { SupportedLanguage } from "@/internationalization/types";

import { ResourceTrace } from "../../types";

export interface ResourceTraceDetailsDialogProps extends DialogProps {
  trace: ResourceTrace;
  context: string | null;
  language: SupportedLanguage;
  dictionary: Pick<
    Dictionary,
    "resource_trace_model" | "resource_trace_details_dialog"
  >;
}

export function ResourceTraceDetailsDialog({
  trace,
  context,
  language,
  dictionary: { resource_trace_model, resource_trace_details_dialog },
  ...rest
}: ResourceTraceDetailsDialogProps) {
  const type: Record<ResourceTraceType, string> = {
    [ResourceTraceType.INPUT]: resource_trace_model["type--input"],
    [ResourceTraceType.ASSIGNMENT]: resource_trace_model["type--assignment"],
    [ResourceTraceType.TRANSFER]: resource_trace_model["type--transfer"],
    [ResourceTraceType.UNASSIGNMENT]:
      resource_trace_model["type--unassignment"],
    [ResourceTraceType.REPAIR]: resource_trace_model["type--repair"],
    [ResourceTraceType.OUTPUT]: resource_trace_model["type--output"],
  };

  return (
    <Dialog {...rest}>
      <DialogContent>
        <DialogContentText fontWeight="bolder" color="text.primary">
          {replacePlaceholders(resource_trace_details_dialog.description, {
            action: type[trace.type],
            timestamp: trace.createdAt.toLocaleString(language),
          })}
        </DialogContentText>

        <Divider sx={{ marginY: 2 }} />

        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          {[
            {
              heading: resource_trace_details_dialog.made_by,
              user: trace.madeBy,
            },
            {
              heading: resource_trace_details_dialog.origin,
              user: trace.origin,
            },
            {
              heading: resource_trace_details_dialog.destination,
              user: trace.destination,
            },
          ]
            .filter(({ user }) => Boolean(user))
            .map(({ heading, user }) => (
              <Grid key={heading} xs={6}>
                <Card>
                  <CardHeader
                    subheader={heading}
                    action={
                      context && (
                        <IconButton
                          LinkComponent={Link}
                          href={`${context}/users/${user?.id}`}
                        >
                          <LaunchIcon />
                        </IconButton>
                      )
                    }
                  />

                  <CardContent sx={{ borderTop: 1, borderTopColor: "divider" }}>
                    <Typography noWrap>
                      {`${user?.name} (${user?.username})`}
                    </Typography>

                    <Typography noWrap variant="caption">
                      {user?.email}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
