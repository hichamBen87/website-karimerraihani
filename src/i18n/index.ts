import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en.json';
import translationES from './locales/es.json';
import translationFR from './locales/fr.json';
import translationAR from './locales/ar.json';

// Function to get initial language
const getInitialLanguage = () => {
  // Check localStorage first
  const savedLanguage = localStorage.getItem('preferredLanguage');
  if (savedLanguage) return savedLanguage;

  // Then check browser language
  const browserLang = navigator.language.split('-')[0];
  if (['es', 'fr', 'en', 'ar'].includes(browserLang)) return browserLang;

  // Default to Spanish
  return 'es';
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      es: { translation: translationES },
      fr: { translation: translationFR },
      ar: { translation: translationAR }
    },
    fallbackLng: 'es',
    lng: getInitialLanguage(),
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: true
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

// Set initial document direction
document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';

// Listen for language changes
i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
});

export default i18n;