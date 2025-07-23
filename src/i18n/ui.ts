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
    "blog.post.lastUpdated": "Last updated on",
    "switcher.availableIn": "Read this post in:",
    "blog.ideaGenerator.title": "Blog Idea Generator",
    "blog.ideaGenerator.description":
      "Generate new blog post ideas based on your interests and expertise.",
    "blog.ideaGenerator.button": "Generate Idea",
    "blog.ideaGenerator.placeholder": "Enter your interests or topics you want to write about...",
    "blog.ideaGenerator.loading": "Generating idea...",
    "blog.ideaGenerator.output": "Your idea will appear here...",
    "api.gemini.prompt":
      'Propose a short, creative project idea in the field of Data Science/AI related to "{keyword}". Focus on the problem to be solved, potential data, and the ML/DL model. Formulate the response concisely and professionally, as a ready-to-display text.',
  },
  pl: {
    "pagination.prev": "← Poprzednie Wpisy",
    "pagination.next": "Następne Wpisy →",
    "blog.title": "Blog",
    "blog.publishDate": "data publikacji",
    "blog.post.lastUpdated": "Ostatnia aktualizacja",
    "switcher.availableIn": "Przeczytaj ten artykuł w języku:",
    "blog.ideaGenerator.title": "Generator Pomysłów na Bloga",
    "blog.ideaGenerator.description":
      "Generuj nowe pomysły na wpisy blogowe na podstawie swoich zainteresowań i wiedzy.",
    "blog.ideaGenerator.button": "Generuj Pomysł",
    "blog.ideaGenerator.placeholder":
      "Wprowadź swoje zainteresowania lub tematy, o których chcesz pisać...",
    "blog.ideaGenerator.loading": "Generowanie pomysłu...",
    "blog.ideaGenerator.output": "Twój pomysł pojawi się tutaj...",
    "api.gemini.prompt":
      'Zaproponuj krótki, kreatywny pomysł na projekt z dziedziny Data Science/AI, związany z "{keyword}". Skup się na problemie do rozwiązania, potencjalnych danych i modelu ML/DL. Odpowiedź sformułuj zwięźle i profesjonalnie, jako gotowy tekst do wyświetlenia.',
  },
} satisfies Record<Language["lang"], Record<string, string>>;
