import { Metadata } from "next";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/LockOutlined";

import { getDictionary } from "@/internationalization/dictionaries/auth";
import { PageParams } from "@/types/page-params";
import Banner from "@/public/sign-in-banner.avif";

import { SignInForm } from "./_components/form";

export async function generateMetadata({
  params: { lang },
}: {
  params: PageParams;
}): Promise<Metadata> {
  const {
    sign_in_page: { title },
  } = await getDictionary(lang);

  return { title };
}

export interface SignInPageProps {
  params: PageParams;
}

export default async function SignInPage({
  params: { lang },
}: SignInPageProps) {
  const {
    sign_in_page: { heading },
    sign_in_form,
  } = await getDictionary(lang);

  return (
    <Grid component="main" container sx={{ height: "100vh" }}>
      <Grid
        sm={4}
        md={8}
        sx={{
          backgroundImage: `url(${Banner.src})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />

      <Grid component={Paper} elevation={12} xs={12} sm={8} md={4}>
        <Stack spacing={3} sx={{ paddingX: 4, paddingY: 8 }}>
          <Stack alignItems="center" spacing={1}>
            <Avatar sx={{ backgroundColor: "secondary.main" }}>
              <LockIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              {heading}
            </Typography>
          </Stack>

          <SignInForm dictionary={{ sign_in_form }} />
        </Stack>
      </Grid>
    </Grid>
  );
}
