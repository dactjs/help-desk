import { Metadata } from "next";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { getDictionary } from "@/internationalization/dictionaries/users";
import { PageParams } from "@/types/page-params";

import { CreateUserForm } from "./_components/form";

export async function generateMetadata({
  params: { lang },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const {
    create_user_page: { title },
  } = await getDictionary(lang);

  return { title };
}

export interface CreateUserPageProps {
  params: PageParams;
}

export default async function CreateUserPage({
  params: { lang },
}: CreateUserPageProps) {
  const { create_user_page } = await getDictionary(lang);

  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Stack spacing={2} divider={<Divider flexItem />}>
        <Typography component="h1" variant="h5">
          {create_user_page.heading}
        </Typography>

        <CreateUserForm dictionary={{ create_user_page }} />
      </Stack>
    </Container>
  );
}
