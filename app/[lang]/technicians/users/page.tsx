import { Metadata } from "next";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

import { Widget } from "@/components/templates/widget";
import { getDictionary } from "@/internationalization/dictionaries/users";
import { PageParams } from "@/types/page-params";

import { UserDataGrid } from "./_components/user-data-grid";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params: { lang },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const {
    users_page: { title },
  } = await getDictionary(lang);

  return { title };
}

export default function UsersPage() {
  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid xs={12}>
          <Widget sx={{ height: 500 }}>
            <UserDataGrid />
          </Widget>
        </Grid>
      </Grid>
    </Container>
  );
}
