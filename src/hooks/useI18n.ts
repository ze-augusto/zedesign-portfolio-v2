import { useState, useEffect } from 'react';
import { PT, EN, type Lang, type Translations } from '@/data/about';

export function useI18n(initial: Lang = 'PT'): {
  lang: Lang;
  t: Translations;
  toggle: () => void;
} {
  const [lang, setLang] = useState<Lang>(initial);

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null;
    if (stored === 'PT' || stored === 'EN') setLang(stored);
  }, []);

  const toggle = () =>
    setLang((l) => {
      const next = l === 'PT' ? 'EN' : 'PT';
      localStorage.setItem('lang', next);
      return next;
    });

  const t: Translations = lang === 'PT' ? PT : EN;
  return { lang, t, toggle };
}
