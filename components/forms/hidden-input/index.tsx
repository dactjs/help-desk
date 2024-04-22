export interface HiddenInputProps {
  name: string;
  value: string | null;
}

export function HiddenInput({ name, value }: HiddenInputProps) {
  if (!value) return null;

  return <input type="hidden" name={name} value={value} />;
}
