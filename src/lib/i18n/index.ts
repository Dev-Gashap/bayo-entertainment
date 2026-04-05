import { en } from "./en";
import { fr } from "./fr";
import { es } from "./es";

export type Locale = "en" | "fr" | "es";
export type Translations = typeof en;

export const translations: Record<Locale, Translations> = { en, fr, es };

export const localeNames: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  es: "ES",
};

export const localeFull: Record<Locale, string> = {
  en: "English",
  fr: "Fran\u00E7ais",
  es: "Espa\u00F1ol",
};
