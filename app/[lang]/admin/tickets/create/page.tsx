import { Metadata } from "next";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { getDictionary } from "@/internationalization/dictionaries/tickets";
import { PageParams } from "@/types/page-params";

import { CreateTicketForm } from "./_components/form";

export async function generateMetadata({
  params: { lang },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const {
    create_ticket_page: { title },
  } = await getDictionary(lang);

  return { title };
}

export interface CreateTicketPageProps {
  params: PageParams;
}

export default async function CreateTicketPage({
  params: { lang },
}: CreateTicketPageProps) {
  const { create_ticket_page } = await getDictionary(lang);

  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Stack spacing={2} divider={<Divider flexItem />}>
        <Typography component="h1" variant="h5">
          {create_ticket_page.heading}
        </Typography>

        <CreateTicketForm dictionary={{ create_ticket_page }} />
      </Stack>
    </Container>
  );
}
