import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: "/assets/i18n/{{ns}}/{{lng}}.json",
    },
    fallbacking: "en",
    debug: false,
    ns: ["navigation", "home", "cards", "user", "common"],
    whitelist: ["en", "sp", "fr", "hi", "po", "ch"],
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    load: "languageOnly",
    interpolation: {
      espaceValue: false,
      formatSeparator: ",",
    },
    react: {
      useSuspense: true,
    },
  })
  .then(() => {
    // Force setting to base language if a regional variant is detected
    const detectedLanguage = i18n.language;
    if (detectedLanguage.includes("-")) {
      const baseLanguage = detectedLanguage.split("-")[0]; // Extract base language ('en' from 'en-IN')
      i18n.changeLanguage(baseLanguage); // Change to base language only
    }
  });

export default i18n;
