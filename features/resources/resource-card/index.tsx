import { Suspense } from "react";

import { CardSkeleton } from "@/components/templates/card-skeleton";

import { ServerResourceCard } from "./server";

export interface ResourceCardProps {
  resourceId: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resourceId }) => (
  <Suspense fallback={<CardSkeleton items={5} />}>
    <ServerResourceCard resourceId={resourceId} />
  </Suspense>
);
