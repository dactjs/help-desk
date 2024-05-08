import { Metadata } from "next";
import NextLink from "next/link";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import MuiLink from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";

import { InternationalizationSettings } from "@/features/settings/internationalization-settings";
import { ThemeSettings } from "@/features/settings/theme-settings";
import { Widget } from "@/components/templates/widget";
import { getDictionary } from "@/internationalization/dictionaries/settings";
import { PageParams } from "@/types/page-params";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params: { lang },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const {
    settings_page: { title },
  } = await getDictionary(lang);

  return { title };
}

export interface SettingsPageProps {
  params: PageParams;
}

export default async function SettingsPage({
  params: { lang },
}: SettingsPageProps) {
  const {
    settings_page: { breadcrumbs },
  } = await getDictionary(lang);

  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid role="presentation" xs={12}>
          <Breadcrumbs aria-label={breadcrumbs.label}>
            <MuiLink
              component={NextLink}
              href={`/${lang}/dashboard`}
              color="inherit"
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <HomeIcon fontSize="inherit" sx={{ mr: 0.5 }} />
              {breadcrumbs.dashboard}
            </MuiLink>

            <MuiLink
              color="text.primary"
              underline="none"
              aria-current="page"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <SettingsIcon fontSize="inherit" sx={{ mr: 0.5 }} />
              {breadcrumbs.settings}
            </MuiLink>
          </Breadcrumbs>
        </Grid>

        <Grid xs={12}>
          <Widget sx={{ height: "auto" }}>
            <InternationalizationSettings />
          </Widget>
        </Grid>

        <Grid xs={12}>
          <Widget sx={{ height: "auto" }}>
            <ThemeSettings />
          </Widget>
        </Grid>
      </Grid>
    </Container>
  );
}
