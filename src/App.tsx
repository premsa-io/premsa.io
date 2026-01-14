import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AuthProvider } from "@/lib/AuthContext";
import { LanguageProvider } from "@/i18n/LanguageContext";
import CookieBanner from "@/components/CookieBanner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { initGA, trackPageView } from "@/lib/analytics";
import ScrollToTop from "./components/ScrollToTop";

// Public pages
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import PricingPage from "./pages/PricingPage";
import PlaygroundPage from "./pages/PlaygroundPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BookDemoPage from "./pages/BookDemoPage";
import PilotPage from "./pages/PilotPage";
import BlogPage from "./pages/BlogPage";

// Demo pages
import DemoSelectorPage from "./pages/demo/DemoSelectorPage";
import DemoLegalPage from "./pages/demo/DemoLegalPage";
import DemoBankingPage from "./pages/demo/DemoBankingPage";
import DemoEnergyPage from "./pages/demo/DemoEnergyPage";
import DemoTelecomsPage from "./pages/demo/DemoTelecomsPage";

// Legal pages
import TermsPage from "./pages/legal/TermsPage";
import PrivacyPage from "./pages/legal/PrivacyPage";
import CookiesPage from "./pages/legal/CookiesPage";
import DpaPage from "./pages/legal/DpaPage";
import SlaPage from "./pages/legal/SlaPage";

// Auth pages
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

// Dashboard
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import AlertsPage from "./pages/dashboard/AlertsPage";
import MatchesPage from "./pages/dashboard/MatchesPage";
import ReportsPage from "./pages/dashboard/ReportsPage";
import KnowledgePage from "./pages/dashboard/KnowledgePage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import ProtectedRoute from "./components/ProtectedRoute";

// Onboarding V3
import { OnboardingProvider } from "./context/OnboardingContext";
import OnboardingStep1Page from "./pages/onboarding/OnboardingStep1Page";
import OnboardingStep2Page from "./pages/onboarding/OnboardingStep2Page";
import OnboardingStep3Page from "./pages/onboarding/OnboardingStep3Page";
import OnboardingStep4Page from "./pages/onboarding/OnboardingStep4Page";
import OnboardingStep5Page from "./pages/onboarding/OnboardingStep5Page";
import OnboardingStep6Page from "./pages/onboarding/OnboardingStep6Page";
import OnboardingStep7Page from "./pages/onboarding/OnboardingStep7Page";
import OnboardingCompletePage from "./pages/onboarding/OnboardingCompletePage";
import AcceptInvitationPage from "./pages/AcceptInvitationPage";
import NotFound from "./pages/NotFound";


// Component that handles analytics tracking
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
          <LanguageProvider>
              <ScrollToTop />
              <AnalyticsTracker />
              <Routes>

                {/* Public pages */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/playground" element={<PlaygroundPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/book-demo" element={<BookDemoPage />} />
                <Route path="/pilot" element={<PilotPage />} />
                <Route path="/blog" element={<BlogPage />} />

                {/* Demo pages */}
                <Route path="/demo" element={<DemoSelectorPage />} />
                <Route path="/demo/legal" element={<DemoLegalPage />} />
                <Route path="/demo/banking" element={<DemoBankingPage />} />
                <Route path="/demo/energy" element={<DemoEnergyPage />} />
                <Route path="/demo/telecoms" element={<DemoTelecomsPage />} />

                {/* Legal pages */}
                <Route path="/legal/terms" element={<TermsPage />} />
                <Route path="/legal/privacy" element={<PrivacyPage />} />
                <Route path="/legal/cookies" element={<CookiesPage />} />
                <Route path="/legal/dpa" element={<DpaPage />} />
                <Route path="/legal/sla" element={<SlaPage />} />

                {/* Auth pages */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<Navigate to="/onboarding/step-1" replace />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                
                {/* Team Invitation */}
                <Route path="/accept-invitation" element={<AcceptInvitationPage />} />

                {/* Onboarding V3 - Step-based */}
                <Route path="/onboarding" element={<Navigate to="/onboarding/step-1" replace />} />
                <Route path="/onboarding/step-1" element={<OnboardingProvider><OnboardingStep1Page /></OnboardingProvider>} />
                <Route path="/onboarding/step-2" element={<OnboardingProvider><OnboardingStep2Page /></OnboardingProvider>} />
                <Route path="/onboarding/step-3" element={<OnboardingProvider><OnboardingStep3Page /></OnboardingProvider>} />
                <Route path="/onboarding/step-4" element={<OnboardingProvider><OnboardingStep4Page /></OnboardingProvider>} />
                <Route path="/onboarding/step-5" element={<OnboardingProvider><OnboardingStep5Page /></OnboardingProvider>} />
                <Route path="/onboarding/step-6" element={<OnboardingProvider><OnboardingStep6Page /></OnboardingProvider>} />
                <Route path="/onboarding/step-7" element={<OnboardingProvider><OnboardingStep7Page /></OnboardingProvider>} />
                <Route path="/onboarding/complete" element={<OnboardingProvider><OnboardingCompletePage /></OnboardingProvider>} />
                
                {/* Legacy onboarding redirects */}
                <Route path="/onboarding/company" element={<Navigate to="/onboarding/step-3" replace />} />
                <Route path="/onboarding/profile" element={<Navigate to="/onboarding/step-2" replace />} />
                <Route path="/onboarding/country" element={<Navigate to="/onboarding/step-4" replace />} />
                <Route path="/onboarding/topics" element={<Navigate to="/onboarding/step-5" replace />} />
                <Route path="/onboarding/plan" element={<Navigate to="/onboarding/step-7" replace />} />
                <Route path="/onboarding/confirm" element={<Navigate to="/onboarding/step-7" replace />} />
                <Route path="/onboarding/success" element={<Navigate to="/onboarding/complete" replace />} />

                {/* Dashboard */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<DashboardHome />} />
                  <Route path="alerts" element={<AlertsPage />} />
                  <Route path="matches" element={<MatchesPage />} />
                  <Route path="reports" element={<ReportsPage />} />
                  <Route path="knowledge" element={<KnowledgePage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
              <CookieBanner />
            </LanguageProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
