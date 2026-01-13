import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface OnboardingData {
  // Step 1: Company
  companyName: string;
  companySize: string;
  sector: string;
  website: string;
  
  // Step 2: Profile
  interfaceLanguage: string;
  contentLanguage: string;
  businessDescription: string;
  
  // Step 3: Country
  selectedCountry: string;
  
  // Step 4: Topics (AI-assisted)
  selectedTopics: TopicRecommendation[];
  aiSummary: string;
  
  // Step 5: Plan
  selectedPlan: string;
  billingCycle: 'monthly' | 'yearly';
  
  // Legacy fields for backward compatibility
  method: 'ai' | 'manual' | null;
  websiteUrl: string;
  description: string;
  selectedDomains: string[];
  selectedCountries: string[];
  waitlistCountries: { code: string; name: string }[];
}

export interface TopicRecommendation {
  id: string;
  title: string;
  primary_ambit: string;
  relevance: 'high' | 'medium' | 'low';
  reason: string;
  selected: boolean;
}

interface OnboardingContextType {
  data: OnboardingData;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  updateData: (updates: Partial<OnboardingData>) => void;
  resetData: () => void;
  getStepFromPath: (path: string) => number;
}

const STEP_PATHS: Record<string, number> = {
  '/onboarding/company': 1,
  '/onboarding/profile': 2,
  '/onboarding/country': 3,
  '/onboarding/topics': 4,
  '/onboarding/plan': 5,
  '/onboarding/confirm': 6,
};

const initialData: OnboardingData = {
  // Step 1
  companyName: '',
  companySize: '',
  sector: '',
  website: '',
  
  // Step 2
  interfaceLanguage: 'ca',
  contentLanguage: 'ca',
  businessDescription: '',
  
  // Step 3
  selectedCountry: '',
  
  // Step 4
  selectedTopics: [],
  aiSummary: '',
  
  // Step 5
  selectedPlan: 'trial',
  billingCycle: 'monthly',
  
  // Legacy
  method: null,
  websiteUrl: '',
  description: '',
  selectedDomains: [],
  selectedCountries: [],
  waitlistCountries: [],
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<OnboardingData>(() => {
    // Try to restore from localStorage
    const saved = localStorage.getItem('onboarding_data');
    if (saved) {
      try {
        return { ...initialData, ...JSON.parse(saved) };
      } catch {
        return initialData;
      }
    }
    return initialData;
  });
  
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(() => {
    return STEP_PATHS[location.pathname] || 1;
  });

  // Sync step with URL
  useEffect(() => {
    const step = STEP_PATHS[location.pathname];
    if (step) {
      setCurrentStep(step);
    }
  }, [location.pathname]);

  // Persist data to localStorage
  useEffect(() => {
    localStorage.setItem('onboarding_data', JSON.stringify(data));
  }, [data]);

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const resetData = () => {
    setData(initialData);
    setCurrentStep(1);
    localStorage.removeItem('onboarding_data');
  };

  const getStepFromPath = (path: string) => STEP_PATHS[path] || 1;

  return (
    <OnboardingContext.Provider value={{ data, currentStep, setCurrentStep, updateData, resetData, getStepFromPath }}>
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
