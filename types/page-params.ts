import { SupportedLanguage } from "@/internationalization/types";

export type PageParams<T = {}> = T & {
  lang: SupportedLanguage;
};
