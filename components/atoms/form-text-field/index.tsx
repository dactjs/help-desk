"use client";

import { useFormStatus } from "react-dom";

import TextField, { TextFieldProps } from "@mui/material/TextField";

export const FormTextField: React.FC<TextFieldProps> = ({
  children,
  ...rest
}) => {
  const { pending } = useFormStatus();

  return (
    <TextField disabled={pending} {...rest}>
      {children}
    </TextField>
  );
};
