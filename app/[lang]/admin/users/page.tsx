import { Metadata } from "next";
import Link from "next/link";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";

import { UserDataGrid } from "@/features/users/user-data-grid";
import { Widget } from "@/components/templates/widget";
import { getDictionary } from "@/internationalization/dictionaries/users";
import { PageParams } from "@/types/page-params";

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

export interface UsersPageProps {
  params: PageParams;
}

export default async function UsersPage({ params: { lang } }: UsersPageProps) {
  const { users_page } = await getDictionary(lang);

  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid xs={12}>
          <Toolbar sx={{ justifyContent: "flex-end" }}>
            <Button
              LinkComponent={Link}
              href={`/${lang}/admin/users/create`}
              variant="contained"
              color="primary"
            >
              {users_page["toolbar_button--create"]}
            </Button>
          </Toolbar>
        </Grid>

        <Grid xs={12}>
          <Widget>
            <UserDataGrid />
          </Widget>
        </Grid>
      </Grid>
    </Container>
  );
}
