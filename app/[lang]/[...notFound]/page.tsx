import Container from "@mui/material/Container";

import { NotFound } from "@/components/templates/not-found";
import { getDictionary } from "@/internationalization/dictionaries/common";
import { PageParams } from "@/types/page-params";

export interface RootNotFoundProps {
  params: PageParams;
}

export default async function RootNotFound({
  params: { lang },
}: RootNotFoundProps) {
  const {
    root_not_found: { heading, description },
  } = await getDictionary(lang);

  return (
    <Container
      component="main"
      fixed
      sx={{ height: "100vh", placeContent: "center" }}
    >
      <NotFound heading={heading} description={description} />
    </Container>
  );
}
