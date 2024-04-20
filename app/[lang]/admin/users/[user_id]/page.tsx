import { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import { subject } from "@casl/ability";

import { auth } from "@/auth";
import { createAbilityFor } from "@/auth/utils/create-ability-for";
import { UserCard } from "@/features/users/user-card";
import { Widget } from "@/components/templates/widget";
import { getDictionary } from "@/internationalization/dictionaries/users";
import { replacePlaceholders } from "@/internationalization/utils/replace-placeholders";
import { getShortUUID } from "@/utils/get-short-uuid";
import { prisma } from "@/lib/prisma";
import { PageParams } from "@/types/page-params";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params: { lang, user_id },
}: {
  params: UserPageParams;
}): Promise<Metadata> {
  const {
    user_page: { title },
  } = await getDictionary(lang);

  const replaced = replacePlaceholders(title, {
    id: getShortUUID(user_id),
  });

  return { title: replaced };
}

type UserPageParams = PageParams<{
  user_id: string;
}>;

export interface UserPageProps {
  params: UserPageParams;
}

export default async function UserPage({ params: { user_id } }: UserPageProps) {
  const [session, user] = await Promise.all([
    auth(),
    prisma.user.findUnique({ where: { id: user_id } }),
  ]);

  const ability = createAbilityFor(session);

  if (!user || !ability.can("read", subject("User", user))) notFound();

  return (
    <Container fixed sx={{ paddingY: 2 }}>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid xs={12}>
          <Widget>
            <UserCard userId={user_id} />
          </Widget>
        </Grid>
      </Grid>
    </Container>
  );
}
