import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import { trackEvent } from "@/lib/analytics";

interface LanguageContextType {
  currentLanguage: string;
  contentLanguage: string;
  changeLanguage: (lang: string) => Promise<void>;
  changeContentLanguage: (lang: string) => Promise<void>;
  availableLanguages: { code: string; label: string; short: string }[];
}

const availableLanguages = [
  { code: "es", label: "Español", short: "ES" },
  { code: "ca", label: "Català", short: "CA" },
  { code: "en", label: "English", short: "EN" },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const { user, profile } = useAuth();
  const [contentLanguage, setContentLanguage] = useState("es");

  // Sync languages from user profile when authenticated
  useEffect(() => {
    const syncLanguagesFromProfile = async () => {
      if (user && profile) {
        // Sync interface_language
        const profileLang = (profile as any).interface_language;
        if (profileLang && availableLanguages.some(l => l.code === profileLang)) {
          if (i18n.language !== profileLang) {
            await i18n.changeLanguage(profileLang);
            localStorage.setItem("premsa_language", profileLang);
          }
        }
        
        // Sync content_language
        const profileContentLang = (profile as any).content_language;
        if (profileContentLang && availableLanguages.some(l => l.code === profileContentLang)) {
          setContentLanguage(profileContentLang);
        }
      }
    };

    syncLanguagesFromProfile();
  }, [user, profile, i18n]);

  const changeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang);
    localStorage.setItem("premsa_language", lang);
    trackEvent('change_language', { language: lang, type: 'interface' });

    if (user) {
      try {
        await supabase
          .from("user_profiles" as any)
          .update({ interface_language: lang })
          .eq("id", user.id);
      } catch (error) {
        console.error("Failed to save interface language preference:", error);
      }
    }
  };

  const changeContentLanguage = async (lang: string) => {
    setContentLanguage(lang);

    if (user) {
      try {
        await supabase
          .from("user_profiles" as any)
          .update({ content_language: lang })
          .eq("id", user.id);
      } catch (error) {
        console.error("Failed to save content language preference:", error);
      }
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage: i18n.language,
        contentLanguage,
        changeLanguage,
        changeContentLanguage,
        availableLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
