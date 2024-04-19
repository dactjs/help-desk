import { Suspense } from "react";

import { CardSkeleton } from "@/components/templates/card-skeleton";

import { ServerResourceCard } from "./server";

export interface ResourceCardProps {
  resourceId: string;
}

export function ResourceCard({ resourceId }: ResourceCardProps) {
  return (
    <Suspense fallback={<CardSkeleton items={6} />}>
      <ServerResourceCard resourceId={resourceId} />
    </Suspense>
  );
}
