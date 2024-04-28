import Container from "@mui/material/Container";

import { NotFound } from "@/components/templates/not-found";
import { getAppLanguage } from "@/internationalization/utils/get-app-language";
import { getDictionary } from "@/internationalization/dictionaries/common";

export default async function DashboardNotFound() {
  const language = getAppLanguage();

  const {
    root_not_found: { heading, description, call_to_action_text },
  } = await getDictionary(language);

  return (
    <Container
      fixed
      sx={{
        display: "grid",
        minHeight: "100%",
        placeContent: "center",
      }}
    >
      <NotFound
        heading={heading}
        description={description}
        callToAction={{
          href: `/${language}/dashboard`,
          text: call_to_action_text,
        }}
      />
    </Container>
  );
}
