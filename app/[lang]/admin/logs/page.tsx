import { Metadata } from "next";
import { ReadonlyURLSearchParams } from "next/navigation";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

import { Can } from "@/auth/ability";
import { Widget } from "@/components/templates/widget";
import { getDictionary } from "@/internationalization/dictionaries/logs";
import { PageParams } from "@/types/page-params";

import { LogsToolbar } from "./_components/toolbar";
import { LogDataGrid } from "./_components/log-data-grid";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params: { lang },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const {
    logs_page: { title },
  } = await getDictionary(lang);

  return { title };
}

export interface LogsPageProps {
  params: PageParams;
  searchParams: ReadonlyURLSearchParams;
}

export default function LogsPage({ searchParams }: LogsPageProps) {
  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Can I="read" a="Log">
          <Grid xs={12}>
            <Widget sx={{ height: "auto" }}>
              <LogsToolbar />
            </Widget>
          </Grid>
        </Can>

        <Grid xs={12}>
          <Widget sx={{ height: 500 }}>
            <LogDataGrid searchParams={searchParams} />
          </Widget>
        </Grid>
      </Grid>
    </Container>
  );
}
