"use client";

import { useState, useEffect } from "react";
import { useFormStatus } from "react-dom";

import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import TextField, { TextFieldProps } from "@mui/material/TextField";

import { query } from "./actions/query";
import { TicketService } from "./types";

export type TicketServiceAutocompleteProps = Omit<
  AutocompleteProps<TicketService, boolean, boolean, boolean>,
  "options" | "renderInput"
> & {
  required?: boolean;
  error?: TextFieldProps["error"];
  label?: TextFieldProps["label"];
  helperText?: TextFieldProps["helperText"];
};

export const TicketServiceAutocomplete: React.FC<
  TicketServiceAutocompleteProps
> = ({ required, error, label, helperText, ...rest }) => {
  const { pending } = useFormStatus();

  const [input, setInput] = useState<string>("");
  const [options, setOptions] = useState<TicketService[]>([]);

  useEffect(() => {
    (async () => {
      const services = await query(input);
      setOptions(services);
    })();
  }, [input]);

  const getOptionLabel = (option: string | TicketService) =>
    typeof option !== "string" ? option.name : option;

  return (
    <Autocomplete
      disabled={pending}
      options={options}
      groupBy={(option) => option.category.name}
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
