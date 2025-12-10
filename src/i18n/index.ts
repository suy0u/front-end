import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./en.json";
import ua from "./ua.json";

const savedLng = localStorage.getItem("lng") || "en";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: savedLng,
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      ua: { translation: ua },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
