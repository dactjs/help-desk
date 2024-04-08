import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { PageParams } from "@/types/page-params";

import { CreateResourceForm } from "./_components/form";
import { getDictionary } from "./_dictionaries";

export interface CreateResourcePageProps {
  params: PageParams;
}

export default async function CreateResourcePage({
  params: { lang },
}: {
  params: PageParams;
}) {
  const {
    heading,
    brand_input_label,
    model_input_label,
    serial_input_label,
    submit_button_text,
  } = await getDictionary(lang);

  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Stack divider={<Divider flexItem />}>
        <Typography component="h1" variant="h5">
          {heading}
        </Typography>

        <CreateResourceForm
          brand_input_label={brand_input_label}
          model_input_label={model_input_label}
          serial_input_label={serial_input_label}
          submit_button_text={submit_button_text}
        />
      </Stack>
    </Container>
  );
}
