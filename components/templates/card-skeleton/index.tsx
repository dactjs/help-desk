import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

export interface CardSkeletonProps {
  items: number;
}

export function CardSkeleton({ items }: CardSkeletonProps) {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardHeader subheader={<Skeleton width="75%" />} />

      <CardContent
        sx={{
          height: "100%",
          overflowY: "auto",
          borderTop: 1,
          borderTopColor: "divider",
        }}
      >
        <List disablePadding>
          {Array.from({ length: items }).map((_, index) => {
            const random = Math.round(Math.random() * items);

            const primary =
              random % 3 === 0 ? "50%" : random % 2 === 0 ? "75%" : "25%";

            const secondary =
              (random + index) % 3 === 0
                ? "25%"
                : random % 2 === 0
                ? "50%"
                : "75%";

            return (
              <ListItem key={index} disablePadding>
                <ListItemText
                  primary={<Skeleton width={primary} />}
                  secondary={<Skeleton width={secondary} />}
                />
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}
