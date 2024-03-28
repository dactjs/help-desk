import { SupportedLanguage } from "./supported-language";

export type PageParams<T = {}> = T & {
  lang: SupportedLanguage;
};
