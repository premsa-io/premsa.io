import { createContext, useContext, useEffect, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (lang: string) => Promise<void>;
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

  // Sync language from user profile when authenticated
  useEffect(() => {
    const syncLanguageFromProfile = async () => {
      if (user && profile) {
        // Check if profile has interface_language (from external DB)
        const profileLang = (profile as any).interface_language;
        if (profileLang && availableLanguages.some(l => l.code === profileLang)) {
          if (i18n.language !== profileLang) {
            await i18n.changeLanguage(profileLang);
            localStorage.setItem("premsa_language", profileLang);
          }
        }
      }
    };

    syncLanguageFromProfile();
  }, [user, profile, i18n]);

  const changeLanguage = async (lang: string) => {
    // Change i18n language
    await i18n.changeLanguage(lang);
    
    // Save to localStorage
    localStorage.setItem("premsa_language", lang);

    // If authenticated, update user profile in DB
    if (user) {
      try {
        await supabase
          .from("user_profiles" as any)
          .update({ interface_language: lang })
          .eq("id", user.id);
      } catch (error) {
        console.error("Failed to save language preference:", error);
      }
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage: i18n.language,
        changeLanguage,
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
