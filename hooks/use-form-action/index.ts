import { useEffect } from "react";
import { useFormState } from "react-dom";

import { FormAction } from "@/types/form-action";

export type UseFormActionParams = {
  action: FormAction;
  onComplete?: () => void;
};

export function useFormAction(params: UseFormActionParams) {
  const [state, action] = useFormState(params.action, {
    complete: false,
    errors: { server: null, fields: null },
  });

  useEffect(() => {
    if (state.complete && params?.onComplete) params.onComplete();
  }, [state.complete, params]);

  return { state, action };
}
