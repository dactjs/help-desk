"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import MuiPagination from "@mui/material/Pagination";

import { DEFAULT_PAGINATION } from "../config";

export interface PaginationProps {
  count: number;
}

export function Pagination({ count }: PaginationProps) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const page = params.get("page")
    ? Number(params.get("page"))
    : DEFAULT_PAGINATION.PAGE;

  const pageSize = params.get("pageSize")
    ? Number(params.get("pageSize"))
    : DEFAULT_PAGINATION.PAGE_SIZE;

  const handleOnChange = (_: React.ChangeEvent<unknown>, page: number) => {
    params.set("page", String(page));

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <MuiPagination
      variant="outlined"
      shape="rounded"
      count={Math.ceil(count / pageSize)}
      page={page}
      onChange={handleOnChange}
    />
  );
}
