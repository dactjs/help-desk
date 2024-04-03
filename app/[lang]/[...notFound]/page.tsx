import Container from "@mui/material/Container";

import { NotFound } from "@/components/templates/not-found";
import { PageParams } from "@/types/page-params";

import { getDictionary } from "../_dictionaries";

export interface RootNotFoundProps {
  params: PageParams;
}

export default async function RootNotFound({
  params: { lang },
}: RootNotFoundProps) {
  const {
    not_found_heading,
    not_found_description,
    not_found_call_to_action_text,
  } = await getDictionary(lang);

  return (
    <Container
      component="main"
      fixed
      sx={{ height: "100vh", placeContent: "center" }}
    >
      <NotFound
        heading={not_found_heading}
        description={not_found_description}
        callToAction={{
          href: `/${lang}/dashboard`,
          text: not_found_call_to_action_text,
        }}
      />
    </Container>
  );
}
