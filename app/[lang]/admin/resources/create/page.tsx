import { Metadata } from "next";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { getDictionary } from "@/internationalization/dictionaries/resources";
import { PageParams } from "@/types/page-params";

import { CreateResourceForm } from "./_components/form";

export async function generateMetadata({
  params: { lang },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const {
    create_resource_page: { title },
  } = await getDictionary(lang);

  return { title };
}

export interface CreateResourcePageProps {
  params: PageParams;
}

export default async function CreateResourcePage({
  params: { lang },
}: CreateResourcePageProps) {
  const { create_resource_page } = await getDictionary(lang);

  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Stack spacing={2} divider={<Divider flexItem />}>
        <Typography component="h1" variant="h5">
          {create_resource_page.heading}
        </Typography>

        <CreateResourceForm dictionary={{ create_resource_page }} />
      </Stack>
    </Container>
  );
}
