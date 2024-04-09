import { Metadata } from "next";
import Link from "next/link";

import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";

import { Widget } from "@/components/templates/widget";
import { PageParams } from "@/types/page-params";

import { ResourceDataGrid } from "./_components/resource-data-grid";
import { getDictionary } from "./_dictionaries";

export async function generateMetadata({
  params: { lang },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { title } = await getDictionary(lang);

  return { title };
}

export interface ResourcesPageProps {
  params: PageParams;
}

export default async function ResourcesPage({
  params: { lang },
}: ResourcesPageProps) {
  const dictionary = await getDictionary(lang);

  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid xs={12}>
          <Toolbar sx={{ justifyContent: "flex-end" }}>
            <Button
              LinkComponent={Link}
              href={`/${lang}/admin/resources/create`}
              variant="contained"
              color="primary"
            >
              {dictionary["toolbar_button--create"]}
            </Button>
          </Toolbar>
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
