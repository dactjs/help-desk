/* eslint-disable no-unused-vars */

export type FormActionState = {
  complete: boolean;
  errors: {
    server: string | null;
    fields: Record<string, string[]> | null;
  };
};

export type FormAction = (
  state: FormActionState,
  formData: FormData
) => Promise<FormActionState>;
