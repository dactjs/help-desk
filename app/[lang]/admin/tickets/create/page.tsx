import { Metadata } from "next";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { PageParams } from "@/types/page-params";

import { CreateTicketForm } from "./_components/form";
import { getDictionary } from "./_dictionaries";

export async function generateMetadata({
  params: { lang },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { title } = await getDictionary(lang);

  return { title };
}

export interface CreateTicketPageProps {
  params: PageParams;
}

export default async function CreateTicketPage({
  params: { lang },
}: CreateTicketPageProps) {
  const {
    heading,
    issue_input_label,
    service_input_label,
    user_input_label,
    technician_input_label,
    submit_button_text,
  } = await getDictionary(lang);

  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Stack spacing={2} divider={<Divider flexItem />}>
        <Typography component="h1" variant="h5">
          {heading}
        </Typography>

        <CreateTicketForm
          issue_input_label={issue_input_label}
          service_input_label={service_input_label}
          user_input_label={user_input_label}
          technician_input_label={technician_input_label}
          submit_button_text={submit_button_text}
        />
      </Stack>
    </Container>
  );
}
