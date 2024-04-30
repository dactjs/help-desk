import { useState, useEffect } from "react";

import { query } from "../../actions/query";
import { TicketService } from "../../types";

export interface UseOptionsReturn {
  loading: boolean;
  options: TicketService[];
}

export function useOptions(input: string): UseOptionsReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<TicketService[]>([]);

  useEffect(() => {
    setLoading(true);

    query(input)
      .then((services) => setOptions(services))
      .finally(() => setLoading(false));
  }, [input]);

  return {
    loading,
    options,
  };
}
