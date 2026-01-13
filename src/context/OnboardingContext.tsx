import { createContext, useContext, useState, ReactNode } from "react";

export interface OnboardingData {
  method: 'ai' | 'manual' | null;
  websiteUrl: string;
  description: string;
  aiSummary: string;
  selectedDomains: string[];
  selectedCountries: string[];
  waitlistCountries: { code: string; name: string }[];
}

interface OnboardingContextType {
  data: OnboardingData;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  updateData: (updates: Partial<OnboardingData>) => void;
  resetData: () => void;
}

const initialData: OnboardingData = {
  method: null,
  websiteUrl: '',
  description: '',
  aiSummary: '',
  selectedDomains: [],
  selectedCountries: [],
  waitlistCountries: [],
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<OnboardingData>(initialData);
  const [currentStep, setCurrentStep] = useState(1);

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const resetData = () => {
    setData(initialData);
    setCurrentStep(1);
  };

  return (
    <OnboardingContext.Provider value={{ data, currentStep, setCurrentStep, updateData, resetData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
