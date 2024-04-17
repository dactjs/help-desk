"use client";

import { useFormStatus } from "react-dom";
import TextField, { TextFieldProps } from "@mui/material/TextField";

export function FormTextField(props: TextFieldProps) {
  const { pending } = useFormStatus();

  return <TextField disabled={pending} {...props} />;
}
