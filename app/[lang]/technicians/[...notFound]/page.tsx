import Container from "@mui/material/Container";

import { NotFound } from "@/components/templates/not-found";
import { getDictionary } from "@/internationalization/dictionaries/common";
import { PageParams } from "@/types/page-params";

export interface TechniciansNotFoundProps {
  params: PageParams;
}

export default async function TechniciansNotFound({
  params: { lang },
}: TechniciansNotFoundProps) {
  const {
    root_not_found: { heading, description, call_to_action_text },
  } = await getDictionary(lang);

  return (
    <Container fixed sx={{ minHeight: "100%", placeContent: "center" }}>
      <NotFound
        heading={heading}
        description={description}
        callToAction={{
          href: `/${lang}/technicians`,
          text: call_to_action_text,
        }}
      />
    </Container>
  );
}
