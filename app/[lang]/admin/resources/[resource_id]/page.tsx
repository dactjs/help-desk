import { Metadata } from "next";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

import { ResourceCard } from "@/features/resources/resource-card";
import { ResourceTraceTimeline } from "@/features/resources/resource-trace-timeline";
import { UserCard } from "@/features/users/user-card";
import { Widget } from "@/components/templates/widget";
import { getDictionary } from "@/internationalization/dictionaries/resources";
import { replacePlaceholders } from "@/internationalization/utils/replace-placeholders";
import { getShortUUID } from "@/utils/get-short-uuid";
import { prisma } from "@/lib/prisma";
import { PageParams } from "@/types/page-params";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params: { lang, resource_id },
}: {
  params: ResourcePageParams;
}): Promise<Metadata> {
  const {
    resource_page: { title },
  } = await getDictionary(lang);

  const replaced = replacePlaceholders(title, {
    id: getShortUUID(resource_id),
  });

  return { title: replaced };
}

type ResourcePageParams = PageParams & {
  resource_id: string;
};

export interface ResourcePageProps {
  params: ResourcePageParams;
}

export default async function ResourcePage({
  params: { resource_id },
}: ResourcePageProps) {
  // TODO: add authorization
  const { assignedToId } = await prisma.resource.findUniqueOrThrow({
    where: { id: resource_id },
    select: { assignedToId: true },
  });

  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid xs={12} md={5}>
          <Widget>
            <ResourceCard resourceId={resource_id} />
          </Widget>
        </Grid>

        <Grid xs={12} md={7}>
          <Widget>
            <ResourceTraceTimeline resourceId={resource_id} />
          </Widget>
        </Grid>

        {assignedToId && (
          <Grid xs={12} md={6}>
            <Widget>
              <UserCard userId={assignedToId} />
            </Widget>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
