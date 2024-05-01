import { Metadata } from "next";
import { ReadonlyURLSearchParams } from "next/navigation";
import Container from "@mui/material/Container";

import { Widget } from "@/components/templates/widget";
import { getDictionary } from "@/internationalization/dictionaries/tickets";
import { PageParams } from "@/types/page-params";

import { TicketList } from "./_components/ticket-list";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params: { lang },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const {
    tickets_page: { title },
  } = await getDictionary(lang);

  return { title };
}

export interface TicketsPageProps {
  params: PageParams;
  searchParams: ReadonlyURLSearchParams;
}

export default function TicketsPage({ searchParams }: TicketsPageProps) {
  return (
    <Container fixed sx={{ display: "grid", height: "100%" }}>
      <Widget sx={{ height: "100%", overflow: "hidden" }}>
        <TicketList searchParams={searchParams} />
      </Widget>
    </Container>
  );
}
