"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import TextField, { TextFieldProps } from "@mui/material/TextField";

import { useOptions } from "./hooks/use-options";
import { TicketServiceCategory } from "./types";

export type TicketServiceCategoryAutocompleteProps = Omit<
  AutocompleteProps<TicketServiceCategory, boolean, boolean, boolean>,
  "options" | "renderInput"
> & {
  required?: boolean;
  error?: TextFieldProps["error"];
  label?: TextFieldProps["label"];
  helperText?: TextFieldProps["helperText"];
};

export function TicketServiceCategoryAutocomplete({
  required,
  error,
  label,
  helperText,
  ...rest
}: TicketServiceCategoryAutocompleteProps) {
  const { pending } = useFormStatus();

  const [input, setInput] = useState<string>("");

  const { loading, options } = useOptions(input);

  const getOptionLabel = (option: string | TicketServiceCategory) =>
    typeof option !== "string" ? option.name : option;

  return (
    <Autocomplete
      loading={loading}
      disabled={pending}
      options={options}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          error={error}
          label={label}
          helperText={helperText}
        />
      )}
      onInputChange={(_, value) => setInput(value)}
      {...rest}
    />
  );
}
