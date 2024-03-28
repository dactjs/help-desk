import { SupportedLanguage } from "@/types/supported-language";

export const ENV = {
  // Server
  FALLBACK_LANGUAGE: process.env.FALLBACK_LANGUAGE as SupportedLanguage,

  // Client
} as const;

Object.entries(ENV).forEach(([key, value]) => {
  if (typeof window === "undefined" && key.startsWith("NEXT_PUBLIC")) return;
  if (!value) throw new Error(`Missing ${key} environment variable`);
});
