import { TEXT_SURROUNDED_BY_BRACKETS } from "../../constants";

export function replacePlaceholders(
  text: string,
  placeholders: Record<string | number, string>
): string {
  return text.replace(
    TEXT_SURROUNDED_BY_BRACKETS,
    (_, placeholder) => placeholders[placeholder] || placeholder
  );
}
