import { Metadata } from "next";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

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

export default function SettingsPage() {
  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
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
