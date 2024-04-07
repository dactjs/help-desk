import { Metadata } from "next";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

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

export default function ResourcesPage() {
  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid xs={12}>
          <Widget>
            <ResourceDataGrid />
          </Widget>
        </Grid>
      </Grid>
    </Container>
  );
}
