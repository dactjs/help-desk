"use client";

import { useState, useEffect } from "react";
import { useFormStatus } from "react-dom";

import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField, { TextFieldProps } from "@mui/material/TextField";

import { query, QueryFilters } from "./actions/query";
import { User } from "./types";

export type UserAutocompleteProps = Omit<
  AutocompleteProps<User, boolean, boolean, boolean>,
  "options" | "renderInput"
> & {
  filters?: QueryFilters;
  required?: boolean;
  error?: TextFieldProps["error"];
  label?: TextFieldProps["label"];
  helperText?: TextFieldProps["helperText"];
};

export const UserAutocomplete: React.FC<UserAutocompleteProps> = ({
  filters,
  required,
  error,
  label,
  helperText,
  ...rest
}) => {
  const { pending } = useFormStatus();

  const [input, setInput] = useState<string>("");
  const [options, setOptions] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const users = await query(input, filters);
      setOptions(users);
    })();
  }, [input, filters]);

  const getOptionLabel = (option: string | User) =>
    typeof option !== "string" ? `${option.name} (${option.username})` : option;

  return (
    <Autocomplete
      disabled={pending}
      options={options}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={getOptionLabel}
      renderOption={(props, option) => (
        <ListItem
          {...props}
          key={option.id}
          sx={{
            borderBottom: 1,
            borderBottomColor: "divider",
            "&:last-child": { borderBottom: "none" },
          }}
        >
          <ListItemText
            primary={`${option.name} (${option.username})`}
            secondary={option.email}
          />
        </ListItem>
      )}
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
