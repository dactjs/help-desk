"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import TextField from "@mui/material/TextField";
import { debounce } from "@mui/material/utils";
import SearchIcon from "@mui/icons-material/Search";

export interface SearchProps {
  placeholder: string;
}

export function Search({ placeholder }: SearchProps) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const search = params.get("search");

  const handleOnChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      params.delete("page");
      params.delete("pageSize");

      if (event.target.value) {
        params.set("search", event.target.value);
      } else {
        params.delete("search");
      }

      router.replace(`${pathname}?${params.toString()}`);
    },
    300
  );

  return (
    <TextField
      size="small"
      placeholder={placeholder}
      defaultValue={search ?? ""}
      onChange={handleOnChange}
      InputProps={{ endAdornment: <SearchIcon /> }}
    />
  );
}
