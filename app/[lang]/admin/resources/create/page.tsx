import { Metadata } from "next";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { PageParams } from "@/types/page-params";

import { CreateResourceForm } from "./_components/form";
import { getDictionary } from "./_dictionaries";

export async function generateMetadata({
  params: { lang },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { title } = await getDictionary(lang);

  return { title };
}

export interface CreateResourcePageProps {
  params: PageParams;
}

export default async function CreateResourcePage({
  params: { lang },
}: CreateResourcePageProps) {
  const {
    heading,
    brand_input_label,
    model_input_label,
    serial_input_label,
    user_input_label,
    submit_button_text,
  } = await getDictionary(lang);

  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Stack spacing={2} divider={<Divider flexItem />}>
        <Typography component="h1" variant="h5">
          {heading}
        </Typography>

        <CreateResourceForm
          brand_input_label={brand_input_label}
          model_input_label={model_input_label}
          serial_input_label={serial_input_label}
          user_input_label={user_input_label}
          submit_button_text={submit_button_text}
        />
      </Stack>
    </Container>
  );
}
