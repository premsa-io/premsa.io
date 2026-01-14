import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/AuthContext";
import { useStripePortal } from "@/hooks/useStripePortal";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { CreditCard, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const TIER_NAMES: Record<string, string> = {
  starter: "Starter",
  professional: "Professional",
  business: "Business",
  free: "Free",
};

const TIER_PRICES: Record<string, { monthly: number; annual: number }> = {
  starter: { monthly: 110000, annual: 1080000 },
  professional: { monthly: 320000, annual: 3135000 },
  business: { monthly: 650000, annual: 6270000 },
  free: { monthly: 0, annual: 0 },
};

// Stripe price IDs
const STRIPE_PRICES: Record<string, Record<string, string>> = {
  starter: {
    monthly: "price_1Sp8byFP6rFyUDE1Lwb4AKzP",
    yearly: "price_1Sp8byFP6rFyUDE1or1GfwBZ",
  },
  professional: {
    monthly: "price_1Sp8duFP6rFyUDE1PW9qJH6w",
    yearly: "price_1Sp8duFP6rFyUDE1c9qkRp3w",
  },
  business: {
    monthly: "price_1Sp8fLFP6rFyUDE1af3msxWM",
    yearly: "price_1Sp8fLFP6rFyUDE1oig3uNvk",
  },
};

interface PlanFeature {
  text: string;
  included: boolean;
}

export const SubscriptionTab = () => {
  const { t } = useTranslation();
  const { account, profile } = useAuth();
  const { openPortal, isLoading: isPortalLoading } = useStripePortal();
  
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  
  const isAdmin = profile?.role === "org_admin";
  const currentTier = account?.tier || "free";
  const billingPeriod = account?.billing_period || "monthly";
  const status = account?.status || "active";
  const tierPrice = TIER_PRICES[currentTier] || TIER_PRICES.free;
  const tierName = TIER_NAMES[currentTier] || currentTier;

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(cents / 100);
  };

  const handleManageSubscription = () => {
    openPortal();
  };

  const handleUpgrade = async (tier: string) => {
    if (!account?.id) {
      toast.error(t("settings.subscription.errors.noAccount"));
      return;
    }

    setIsUpgrading(true);
    try {
      const priceId = STRIPE_PRICES[tier]?.[billingPeriod === "yearly" ? "yearly" : "monthly"];
      
      if (!priceId) {
        throw new Error("Price not found");
      }

      const { data, error } = await supabase.functions.invoke("stripe-checkout", {
        body: {
          action: "create-checkout-session",
          line_items: [{ price: priceId, quantity: 1 }],
          account_id: account.id,
          success_url: `${window.location.origin}/dashboard/settings?tab=subscription&upgraded=true`,
          cancel_url: window.location.href,
        },
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error upgrading:", error);
      toast.error(t("settings.subscription.errors.upgradeError"));
    } finally {
      setIsUpgrading(false);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "secondary";
      case "trialing":
        return "outline";
      case "past_due":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const professionalFeatures: PlanFeature[] = [
    { text: t("settings.subscription.features.ckbDocs", { count: 100 }), included: true },
    { text: t("settings.subscription.features.chatQuestions", { count: 200 }), included: true },
    { text: t("settings.subscription.features.topics", { count: 100 }), included: true },
    { text: t("settings.subscription.features.workspaces", { count: 5 }), included: true },
    { text: t("settings.subscription.features.emailSupport"), included: true },
  ];

  const businessFeatures: PlanFeature[] = [
    { text: t("settings.subscription.features.unlimitedCkb"), included: true },
    { text: t("settings.subscription.features.unlimitedChat"), included: true },
    { text: t("settings.subscription.features.unlimitedTopics"), included: true },
    { text: t("settings.subscription.features.unlimitedWorkspaces"), included: true },
    { text: t("settings.subscription.features.prioritySupport"), included: true },
    { text: t("settings.subscription.features.accountManager"), included: true },
  ];

  return (
    <div className="space-y-8">
      {/* Current Plan Card */}
      <div className="rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-6 border border-primary/20">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold">{tierName}</h3>
              <Badge variant={getStatusBadgeVariant(status)}>
                {status === "active" ? t("settings.subscription.status.active") : status}
              </Badge>
            </div>
            {currentTier !== "free" && (
              <>
                <p className="text-2xl font-bold mt-2">
                  {formatPrice(billingPeriod === "yearly" ? tierPrice.annual / 12 : tierPrice.monthly)}
                  <span className="text-sm font-normal text-muted-foreground">{t("settings.subscription.perMonth")}</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {billingPeriod === "yearly" 
                    ? t("settings.subscription.billedAnnually")
                    : t("settings.subscription.billedMonthly")
                  }
                </p>
              </>
            )}
            {currentTier === "free" && (
              <p className="text-lg mt-2 text-muted-foreground">
                {t("settings.subscription.freePlan")}
              </p>
            )}
          </div>
          <CreditCard className="h-10 w-10 text-primary/40" />
        </div>

        <div className="flex gap-3 mt-6">
          {isAdmin && currentTier !== "free" && (
            <Button 
              variant="outline" 
              onClick={handleManageSubscription}
              disabled={isPortalLoading}
            >
              {isPortalLoading ? t("common.loading") : t("settings.subscription.manageBilling")}
            </Button>
          )}
          {currentTier !== "business" && (
            <Button onClick={() => setShowUpgradeModal(true)}>
              <Sparkles className="mr-2 h-4 w-4" />
              {t("settings.subscription.improvePlan")}
            </Button>
          )}
        </div>
      </div>

      {/* Billing Portal Info */}
      {isAdmin && currentTier !== "free" && (
        <div className="rounded-lg border border-border p-4 bg-muted/30">
          <p className="text-sm text-muted-foreground">
            {t("settings.subscription.billingPortalInfo")}
          </p>
        </div>
      )}

      {/* Upgrade Modal */}
      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{t("settings.subscription.upgradeTitle")}</DialogTitle>
            <DialogDescription>
              {t("settings.subscription.upgradeDescription")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Professional Plan */}
            <div className={`border rounded-xl p-6 ${currentTier === "professional" ? "opacity-50 bg-muted/30" : ""}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Professional</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.subscription.professionalDesc")}
                  </p>
                </div>
                {currentTier === "professional" && (
                  <Badge variant="secondary">{t("settings.subscription.currentPlan")}</Badge>
                )}
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">{formatPrice(TIER_PRICES.professional.monthly)}</span>
                <span className="text-muted-foreground">{t("settings.subscription.perMonth")}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {professionalFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {feature.text}
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full" 
                variant={currentTier === "professional" ? "outline" : "default"}
                disabled={currentTier === "professional" || isUpgrading}
                onClick={() => handleUpgrade("professional")}
              >
                {currentTier === "professional" 
                  ? t("settings.subscription.currentPlan") 
                  : t("settings.subscription.selectPlan")
                }
              </Button>
            </div>
            
            {/* Business Plan */}
            <div className="border-2 border-primary rounded-xl p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary">{t("settings.subscription.recommended")}</Badge>
              </div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Business</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.subscription.businessDesc")}
                  </p>
                </div>
                {currentTier === "business" && (
                  <Badge variant="secondary">{t("settings.subscription.currentPlan")}</Badge>
                )}
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">{formatPrice(TIER_PRICES.business.monthly)}</span>
                <span className="text-muted-foreground">{t("settings.subscription.perMonth")}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {businessFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {feature.text}
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full"
                disabled={currentTier === "business" || isUpgrading}
                onClick={() => handleUpgrade("business")}
              >
                {isUpgrading ? t("common.loading") : t("settings.subscription.selectPlan")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};