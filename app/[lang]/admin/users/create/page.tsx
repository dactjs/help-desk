import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { PageParams } from "@/types/page-params";

import { CreateUserForm } from "./_components/form";
import { getDictionary } from "./_dictionaries";

export interface CreateUserPageProps {
  params: PageParams;
}

export default async function CreateUserPage({
  params: { lang },
}: {
  params: PageParams;
}) {
  const {
    heading,
    username_input_label,
    email_input_label,
    name_input_label,
    password_input_label,
    submit_button_text,
  } = await getDictionary(lang);

  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Stack divider={<Divider />}>
        <Typography component="h1" variant="h5">
          {heading}
        </Typography>

        <CreateUserForm
          username_input_label={username_input_label}
          email_input_label={email_input_label}
          name_input_label={name_input_label}
          password_input_label={password_input_label}
          submit_button_text={submit_button_text}
        />
      </Stack>
    </Container>
  );
}
