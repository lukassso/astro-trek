import { ui, defaultLang } from "./ui";
import type { Language } from "@/types";

export type UiKey = keyof (typeof ui)[typeof defaultLang];

export function useTranslations(lang: Language["lang"]) {
  return function t(key: UiKey): string {
    const translation = ui[lang]?.[key] || ui[defaultLang][key];

    if (!translation) {
      console.warn(
        `Translation key "${key}" not found for language "${lang}" or default language "${defaultLang}".`,
      );
      return key;
    }

    return translation;
  };
}
