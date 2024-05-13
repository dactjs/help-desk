"use client";

import Link from "next/link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import LaunchIcon from "@mui/icons-material/Launch";
import StarIcon from "@mui/icons-material/Star";

import { NotFound } from "@/components/templates/not-found";
import { Dictionary as PerformanceDictionary } from "@/internationalization/dictionaries/performance";
import { Dictionary as UsersDictionary } from "@/internationalization/dictionaries/users";

import { User } from "./types";

export interface ClientMVPCardProps {
  technician: User | null;
  href: string | null;
  dictionary: Pick<
    PerformanceDictionary & UsersDictionary,
    "mvp_card" | "not_found"
  >;
}

export function ClientMVPCard({
  technician,
  href,
  dictionary: { mvp_card, not_found },
}: ClientMVPCardProps) {
  if (!technician) {
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
        subheader={mvp_card.heading}
        action={
          href && (
            <IconButton LinkComponent={Link} href={href}>
              <LaunchIcon />
            </IconButton>
          )
        }
      />

      <CardContent
        component={Stack}
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{
          height: "100%",
          overflowY: "auto",
          borderTop: 1,
          borderTopColor: "divider",
        }}
      >
        <Badge badgeContent={<StarIcon sx={{ color: "gold" }} />}>
          <Avatar
            alt={String(technician.name)}
            sx={{ width: 80, height: 80 }}
          />
        </Badge>

        <Stack>
          <Typography component="h2" variant="h4" align="center">
            {technician.name}
          </Typography>

          <Typography
            component="strong"
            variant="subtitle1"
            align="center"
            color="text.secondary"
          >
            {technician.email}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
