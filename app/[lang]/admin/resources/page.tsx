import { Metadata } from "next";
import Link from "next/link";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { Can } from "@/auth/ability";
import { ResourceDataGrid } from "@/features/resources/resource-data-grid";
import { Widget } from "@/components/templates/widget";
import { getDictionary } from "@/internationalization/dictionaries/resources";
import { PageParams } from "@/types/page-params";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params: { lang },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const {
    resources_page: { title },
  } = await getDictionary(lang);

  return { title };
}

export interface ResourcesPageProps {
  params: PageParams;
}

export default async function ResourcesPage({
  params: { lang },
}: ResourcesPageProps) {
  const { resources_page } = await getDictionary(lang);

  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid xs={12}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent={{ xs: "center", sm: "flex-end" }}
            spacing={1}
          >
            <Can I="create" a="Resource">
              <Button
                LinkComponent={Link}
                href={`/${lang}/admin/resources/create`}
                variant="contained"
                color="primary"
              >
                {resources_page["toolbar_button--create"]}
              </Button>
            </Can>
          </Stack>
        </Grid>

        <Grid xs={12}>
          <Widget>
            <ResourceDataGrid />
          </Widget>
        </Grid>
      </Grid>
    </Container>
  );
}
