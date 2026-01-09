import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import esCommon from "./locales/es/common.json";
import caCommon from "./locales/ca/common.json";
import enCommon from "./locales/en/common.json";

const resources = {
  es: { common: esCommon },
  ca: { common: caCommon },
  en: { common: enCommon },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "es",
    defaultNS: "common",
    ns: ["common"],
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "premsa_language",
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
