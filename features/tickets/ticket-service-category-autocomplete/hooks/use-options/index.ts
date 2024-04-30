import { useState, useEffect } from "react";

import { query } from "../../actions/query";
import { TicketServiceCategory } from "../../types";

export interface UseOptionsReturn {
  loading: boolean;
  options: TicketServiceCategory[];
}

export function useOptions(input: string): UseOptionsReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<TicketServiceCategory[]>([]);

  useEffect(() => {
    setLoading(true);

    query(input)
      .then((categories) => setOptions(categories))
      .finally(() => setLoading(false));
  }, [input]);

  return {
    loading,
    options,
  };
}
