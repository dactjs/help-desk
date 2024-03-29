"use client";

import { SnackbarProvider } from "notistack";
import { ConfirmProvider } from "material-ui-confirm";

export const ClientProviders: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <SnackbarProvider>
    <ConfirmProvider>{children}</ConfirmProvider>
  </SnackbarProvider>
);
