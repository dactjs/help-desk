"use client";

import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { brown } from "@mui/material/colors";

const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const theme = createTheme({
  palette: { primary: { main: "#429440" }, secondary: brown },
  typography: { fontFamily: roboto.style.fontFamily },
});
