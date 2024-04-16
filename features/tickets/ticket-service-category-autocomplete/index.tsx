"use client";

import { useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import TextField, { TextFieldProps } from "@mui/material/TextField";

import { query } from "./actions/query";
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

export const TicketServiceCategoryAutocomplete: React.FC<
  TicketServiceCategoryAutocompleteProps
> = ({ required, error, label, helperText, ...rest }) => {
  const { pending } = useFormStatus();

  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<TicketServiceCategory[]>([]);

  useEffect(() => {
    setLoading(true);

    query(input)
      .then((categories) => setOptions(categories))
      .finally(() => setLoading(false));
  }, [input]);

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
};
