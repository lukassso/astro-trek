import type { Language } from "@/types";

export const languages: Record<Language["lang"], string> = {
  en: "English",
  pl: "Polski",
};

export const defaultLang: Language["lang"] = "en";

export const ui = {
  en: {
    "pagination.prev": "← Previous Posts",
    "pagination.next": "Next Posts →",
    "blog.title": "The Blog",
    "blog.publishDate": "publish date",
  },
  pl: {
    "pagination.prev": "← Poprzednie Wpisy",
    "pagination.next": "Następne Wpisy →",
    "blog.title": "Blog",
    "blog.publishDate": "data publikacji",
  },
} satisfies Record<Language["lang"], Record<string, string>>;
