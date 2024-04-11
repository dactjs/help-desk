import { Metadata } from "next";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

import { Widget } from "@/components/templates/widget";
import { replacePlaceholders } from "@/internationalization/utils/replace-placeholders";
import { getShortUUID } from "@/utils/get-short-uuid";
import { PageParams } from "@/types/page-params";

import { getDictionary } from "./_dictionaries";

type Params = PageParams & {
  resource_id: string;
};

export async function generateMetadata({
  params: { lang, resource_id },
}: {
  params: Params;
}): Promise<Metadata> {
  const { title } = await getDictionary(lang);

  const replaced = replacePlaceholders(title, {
    id: getShortUUID(resource_id),
  });

  return { title: replaced };
}

export default function ResourcePage() {
  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid xs={12}>
          <Widget />
        </Grid>
      </Grid>
    </Container>
  );
}
