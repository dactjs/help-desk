"use client";

import { useFormStatus } from "react-dom";
import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";

export const SubmitButton: React.FC<LoadingButtonProps> = ({
  children,
  ...rest
}) => {
  const { pending } = useFormStatus();

  return (
    <LoadingButton loading={pending} {...rest}>
      {children}
    </LoadingButton>
  );
};
