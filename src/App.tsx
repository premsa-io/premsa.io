import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/lib/AuthContext";
import { LanguageProvider } from "@/i18n/LanguageContext";
import CookieBanner from "@/components/CookieBanner";
import { initGA, trackPageView } from "@/lib/analytics";

// Public pages
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import PricingPage from "./pages/PricingPage";
import PlaygroundPage from "./pages/PlaygroundPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BookDemoPage from "./pages/BookDemoPage";
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
import SignupPage from "./pages/SignupPage";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
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
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />

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
);

export default App;
