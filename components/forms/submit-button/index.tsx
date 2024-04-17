"use client";

import { useFormStatus } from "react-dom";
import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";

export function SubmitButton({ children, ...rest }: LoadingButtonProps) {
  const { pending } = useFormStatus();

  return (
    <LoadingButton loading={pending} {...rest}>
      {children}
    </LoadingButton>
  );
}
