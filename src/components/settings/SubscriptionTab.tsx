import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/AuthContext";
import { useStripePortal } from "@/hooks/useStripePortal";
import { CreditCard, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TIER_NAMES: Record<string, string> = {
  starter: "Starter",
  professional: "Professional",
  business: "Business",
  free: "Free",
};

const TIER_PRICES: Record<string, { monthly: number; annual: number }> = {
  starter: { monthly: 99000, annual: 99000 * 12 * 0.86 },
  professional: { monthly: 275000, annual: 275000 * 12 * 0.86 },
  business: { monthly: 500000, annual: 500000 * 12 * 0.86 },
  free: { monthly: 0, annual: 0 },
};

export const SubscriptionTab = () => {
  const { t } = useTranslation();
  const { account, profile } = useAuth();
  const { openPortal, isLoading: isPortalLoading } = useStripePortal();
  
  const isAdmin = profile?.role === "org_admin";
  const tier = account?.tier || "free";
  const billingPeriod = account?.billing_period || "monthly";
  const status = account?.status || "active";
  const tierPrice = TIER_PRICES[tier] || TIER_PRICES.free;
  const tierName = TIER_NAMES[tier] || tier;

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

  const handleUpgrade = () => {
    window.location.href = "/pricing";
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
            {tier !== "free" && (
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
            {tier === "free" && (
              <p className="text-lg mt-2 text-muted-foreground">
                {t("settings.subscription.freePlan")}
              </p>
            )}
          </div>
          <CreditCard className="h-10 w-10 text-primary/40" />
        </div>

        <div className="flex gap-3 mt-6">
          {isAdmin && tier !== "free" && (
            <Button 
              variant="outline" 
              onClick={handleManageSubscription}
              disabled={isPortalLoading}
            >
              {isPortalLoading ? t("common.loading") : t("settings.subscription.manageBilling")}
            </Button>
          )}
          {tier !== "business" && (
            <Button onClick={handleUpgrade}>
              {tier === "free" 
                ? t("settings.subscription.seePlans")
                : `${t("settings.subscription.upgradeTo")} Business`
              }
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Billing Portal Info */}
      {isAdmin && tier !== "free" && (
        <div className="rounded-lg border border-border p-4 bg-muted/30">
          <p className="text-sm text-muted-foreground">
            {t("settings.subscription.billingPortalInfo")}
          </p>
        </div>
      )}
    </div>
  );
};