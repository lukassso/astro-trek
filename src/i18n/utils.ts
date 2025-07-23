import { ui, defaultLang } from './ui';
import type { Language } from '@/types';

export type UiKey = keyof typeof ui[typeof defaultLang];

// Definiujemy typ dla obiektu z zamiennikami
type Replacements = Record<string, string | number>;

/**
 * Zwraca funkcję tłumaczącą (funkcję t) dla danego języka.
 * @param lang - Język, dla którego chcemy uzyskać tłumaczenia.
 * @returns Funkcja, która przyjmuje klucz i opcjonalny obiekt zamienników.
 */
export function useTranslations(lang: Language['lang']) {
  return function t(key: UiKey, replacements?: Replacements): string {
    let translation = ui[lang]?.[key] || ui[defaultLang][key];
    
    if (!translation) {
      console.warn(`Translation key "${key}" not found.`);
      return key;
    }

    // Jeśli podano obiekt z zamiennikami, dokonaj podmiany
    if (replacements) {
      Object.entries(replacements).forEach(([keyToReplace, value]) => {
        // Używamy globalnego RegExp, aby podmienić wszystkie wystąpienia
        const regex = new RegExp(`{${keyToReplace}}`, 'g');
        translation = translation.replace(regex, String(value));
      });
    }

    return translation;
  }
}