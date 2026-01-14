import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/AuthContext";
import { useStripePortal } from "@/hooks/useStripePortal";
import { CreditCard, ArrowUpRight, TrendingUp, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface UsageMetric {
  key: string;
  current: number;
  limit: number;
  labelKey: string;
}

// Mock usage data - in real app, this would come from a hook
const MOCK_USAGE: UsageMetric[] = [
  { key: "ckb_documents", current: 24, limit: 30, labelKey: "ckbDocuments" },
  { key: "chat_questions", current: 45, limit: 75, labelKey: "chatQuestions" },
  { key: "active_topics", current: 12, limit: 30, labelKey: "activeTopics" },
  { key: "workspaces", current: 2, limit: 3, labelKey: "workspaces" },
];

const TIER_PRICES: Record<string, { monthly: number; annual: number }> = {
  starter: { monthly: 99000, annual: 99000 * 12 * 0.86 },
  professional: { monthly: 275000, annual: 275000 * 12 * 0.86 },
  business: { monthly: 500000, annual: 500000 * 12 * 0.86 },
};

export const SubscriptionTab = () => {
  const { t } = useTranslation();
  const { account, profile } = useAuth();
  const { openPortal, isLoading: isPortalLoading } = useStripePortal();
  
  const isAdmin = profile?.role === "org_admin";
  const tier = account?.tier || "starter";
  const tierPrice = TIER_PRICES[tier] || TIER_PRICES.starter;

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
    // Navigate to pricing or trigger upgrade flow
    window.location.href = "/pricing";
  };

  return (
    <div className="space-y-8">
      {/* Current Plan Card */}
      <div className="rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-6 border border-primary/20">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold capitalize">{tier}</h3>
              <Badge variant="secondary">{account?.status || "active"}</Badge>
            </div>
            <p className="text-2xl font-bold mt-2">
              {formatPrice(tierPrice.monthly)}
              <span className="text-sm font-normal text-muted-foreground">{t("settings.subscription.perMonth")}</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {t("settings.subscription.billedAnnually")}
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              <span className="font-medium">{t("settings.subscription.nextInvoice")}:</span> 15 feb 2026
            </p>
          </div>
          <CreditCard className="h-10 w-10 text-primary/40" />
        </div>

        <div className="flex gap-3 mt-6">
          {isAdmin && (
            <Button 
              variant="outline" 
              onClick={handleManageSubscription}
              disabled={isPortalLoading}
            >
              {isPortalLoading ? t("common.loading") : t("settings.subscription.manageSubscription")}
            </Button>
          )}
          {tier !== "business" && (
            <Button onClick={handleUpgrade}>
              {t("settings.subscription.upgradeTo")} Business
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Usage Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="text-base font-medium">{t("settings.subscription.currentUsage")}</h3>
        </div>
        
        <p className="text-sm text-muted-foreground">{t("settings.subscription.usageResetsMonthly")}</p>

        <div className="grid gap-4 sm:grid-cols-2">
          {MOCK_USAGE.map((metric) => {
            const percentage = Math.min((metric.current / metric.limit) * 100, 100);
            const isNearLimit = percentage >= 80;
            
            return (
              <div key={metric.key} className="rounded-lg border border-border p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">
                    {t(`settings.subscription.usage.${metric.labelKey}`)}
                  </span>
                  <span className={`text-sm ${isNearLimit ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                    {metric.current}/{metric.limit}
                  </span>
                </div>
                <Progress 
                  value={percentage} 
                  className={isNearLimit ? "[&>div]:bg-destructive" : ""}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Invoices Section */}
      <div className="pt-6 border-t border-border space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-base font-medium">{t("settings.subscription.recentInvoices")}</h3>
        </div>
        
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="divide-y divide-border">
            {[
              { date: "01/01/2026", description: "Professional Anual", amount: 3300000 },
              { date: "01/12/2025", description: "Professional Mensual", amount: 320000 },
            ].map((invoice, i) => (
              <div key={i} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">{invoice.description}</p>
                  <p className="text-sm text-muted-foreground">{invoice.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">{formatPrice(invoice.amount)}</span>
                  <Button variant="ghost" size="sm">
                    PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isAdmin && (
          <Button variant="outline" onClick={handleManageSubscription} disabled={isPortalLoading}>
            {t("settings.subscription.viewAllInvoices")}
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
