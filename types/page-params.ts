import { SupportedLanguage } from "@/internationalization/types/supported-language";

export type PageParams<T = {}> = T & {
  lang: SupportedLanguage;
};
