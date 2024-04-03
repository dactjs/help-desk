import { SupportedLanguage } from "@/types/supported-language";

import { SUPPORTED_LANGUAGES } from "./languages";

export const ENV = {
  // Server
  DATABASE_URL: process.env.DATABASE_URL as string,
  ROOT_USER_USERNAME: process.env.ROOT_USER_USERNAME as string,
  ROOT_USER_EMAIL: process.env.ROOT_USER_EMAIL as string,
  ROOT_USER_PASSWORD: process.env.ROOT_USER_PASSWORD as string,
  ROOT_USER_NAME: process.env.ROOT_USER_NAME as string,
  AUTH_URL: process.env.AUTH_URL as string,
  AUTH_SECRET: process.env.AUTH_SECRET as string,
  FALLBACK_LANGUAGE: process.env.FALLBACK_LANGUAGE as SupportedLanguage,

  // Client
} as const;

Object.entries(ENV).forEach(([key, value]) => {
  if (typeof window === "undefined" && key.startsWith("NEXT_PUBLIC")) return;
  if (!value) throw new Error(`Missing ${key} environment variable`);

  if (
    key === "FALLBACK_LANGUAGE" &&
    !SUPPORTED_LANGUAGES.includes(value as SupportedLanguage)
  ) {
    const formatter = new Intl.ListFormat("en", { type: "disjunction" });

    const list = formatter.format(SUPPORTED_LANGUAGES);

    const message = `Invalid ${key} environment variable value. Supported values are: ${list}`;

    throw new Error(message);
  }
});
