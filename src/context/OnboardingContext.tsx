import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface OnboardingData {
  // Step 1: Create Account
  fullName: string;
  email: string;
  interfaceLanguage: string;
  contentLanguage: string;
  
  // Step 2: AI Fast Track
  websiteUrl: string;
  description: string;
  
  // Step 3: Company Info (AI pre-filled)
  companyName: string;
  companySize: string;
  sector: string;
  website: string;
  aiSummary: string;
  aiAnalysis: {
    company_name?: string;
    sector?: string;
    company_size?: string;
    topics?: TopicRecommendation[];
  } | null;
  
  // Step 4: Country
  selectedCountry: string;
  waitlistCountries: string[];
  
  // Step 5: Topics
  selectedTopics: TopicRecommendation[];
  
  // Step 7: Plan + Addons
  selectedPlan: 'starter' | 'professional' | 'business';
  billingCycle: 'monthly' | 'yearly';
  selectedAddons: string[];
  
  // Legacy fields for backward compatibility
  method: 'ai' | 'manual' | null;
  businessDescription: string;
  selectedDomains: string[];
  selectedCountries: string[];
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
  '/onboarding/step-1': 1,
  '/onboarding/step-2': 2,
  '/onboarding/step-3': 3,
  '/onboarding/step-4': 4,
  '/onboarding/step-5': 5,
  '/onboarding/step-6': 6,
  '/onboarding/step-7': 7,
  '/onboarding/complete': 8,
  // Legacy routes
  '/onboarding/company': 1,
  '/onboarding/profile': 2,
  '/onboarding/country': 4,
  '/onboarding/topics': 5,
  '/onboarding/plan': 7,
  '/onboarding/confirm': 7,
};

const initialData: OnboardingData = {
  // Step 1
  fullName: '',
  email: '',
  interfaceLanguage: 'ca',
  contentLanguage: 'ca',
  
  // Step 2
  websiteUrl: '',
  description: '',
  
  // Step 3
  companyName: '',
  companySize: '',
  sector: '',
  website: '',
  aiSummary: '',
  aiAnalysis: null,
  
  // Step 4
  selectedCountry: '',
  waitlistCountries: [],
  
  // Step 5
  selectedTopics: [],
  
  // Step 7
  selectedPlan: 'starter',
  billingCycle: 'monthly',
  selectedAddons: [],
  
  // Legacy
  method: null,
  businessDescription: '',
  selectedDomains: [],
  selectedCountries: [],
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<OnboardingData>(() => {
    // Try to restore from localStorage
    const saved = localStorage.getItem('onboarding_data_v3');
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
    localStorage.setItem('onboarding_data_v3', JSON.stringify(data));
  }, [data]);

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const resetData = () => {
    setData(initialData);
    setCurrentStep(1);
    localStorage.removeItem('onboarding_data_v3');
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
