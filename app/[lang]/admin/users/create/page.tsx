import Container from "@mui/material/Container";

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
    username_input_label,
    email_input_label,
    name_input_label,
    password_input_label,
    submit_button_text,
  } = await getDictionary(lang);

  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <CreateUserForm
        username_input_label={username_input_label}
        email_input_label={email_input_label}
        name_input_label={name_input_label}
        password_input_label={password_input_label}
        submit_button_text={submit_button_text}
      />
    </Container>
  );
}
