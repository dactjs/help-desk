import Container from "@mui/material/Container";

import { NotFound } from "@/components/templates/not-found";
import { PageParams } from "@/types/page-params";

import { getDictionary } from "../_dictionaries";

export interface DashboardNotFoundProps {
  params: PageParams;
}

export default async function DashboardNotFound({
  params: { lang },
}: DashboardNotFoundProps) {
  const {
    not_found_heading,
    not_found_description,
    not_found_call_to_action_text,
  } = await getDictionary(lang);

  return (
    <Container fixed sx={{ minHeight: "100%", placeContent: "center" }}>
      <NotFound
        heading={not_found_heading}
        description={not_found_description}
        callToAction={{
          href: `/${lang}/Dashboard`,
          text: not_found_call_to_action_text,
        }}
      />
    </Container>
  );
}
