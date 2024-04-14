import Container from "@mui/material/Container";

import { NotFound } from "@/components/templates/not-found";
import { getDictionary } from "@/internationalization/dictionaries/common";
import { PageParams } from "@/types/page-params";

export interface AdminNotFoundProps {
  params: PageParams;
}

export default async function AdminNotFound({
  params: { lang },
}: AdminNotFoundProps) {
  const {
    root_not_found: { heading, description, call_to_action_text },
  } = await getDictionary(lang);

  return (
    <Container fixed sx={{ minHeight: "100%", placeContent: "center" }}>
      <NotFound
        heading={heading}
        description={description}
        callToAction={{
          href: `/${lang}/admin`,
          text: call_to_action_text,
        }}
      />
    </Container>
  );
}
