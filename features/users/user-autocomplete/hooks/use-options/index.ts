import { useState, useEffect } from "react";

import { query, QueryFilters } from "../../actions/query";
import { User } from "../../types";

export interface UseOptionsReturn {
  loading: boolean;
  options: User[];
}

export function useOptions(
  input: string,
  filters?: QueryFilters
): UseOptionsReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<User[]>([]);

  useEffect(() => {
    setLoading(true);

    query(input, filters)
      .then((users) => setOptions(users))
      .finally(() => setLoading(false));
  }, [input, filters]);

  return {
    loading,
    options,
  };
}
