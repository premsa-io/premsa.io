import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/i18n/LanguageContext";
import { User, Building2, Shield, Globe, Bell, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SettingsPageSkeleton = () => (
  <div className="space-y-6">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="rounded-xl bg-card p-6 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-6 w-40" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[...Array(2)].map((_, j) => (
            <div key={j} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-48" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const SettingsPage = () => {
  const { t } = useTranslation();
  const { user, profile, account, loading } = useAuth();
  const { currentLanguage, contentLanguage, changeLanguage, changeContentLanguage, availableLanguages } = useLanguage();

  if (loading) {
    return (
      <div>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-2 h-5 w-64" />
        <div className="mt-8">
          <SettingsPageSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-semibold text-foreground">{t("settings.title")}</h1>
      <p className="mt-2 text-muted-foreground">
        {t("settings.description")}
      </p>

      <div className="mt-8 space-y-6">
        {/* Language Settings */}
        <div className="rounded-xl bg-card p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-medium text-foreground">{t("settings.languageSection")}</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            {t("settings.languageSectionDescription")}
          </p>

          <div className="space-y-6">
            {/* Interface Language */}
            <div>
              <label className="text-sm font-medium text-foreground">
                {t("settings.interfaceLanguage")}
              </label>
              <p className="text-sm text-muted-foreground mb-2">
                {t("settings.interfaceLanguageDescription")}
              </p>
              <Select value={currentLanguage} onValueChange={changeLanguage}>
                <SelectTrigger className="w-full sm:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableLanguages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="mr-2 font-mono text-xs text-muted-foreground">{lang.short}</span>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Content Language */}
            <div>
              <label className="text-sm font-medium text-foreground">
                {t("settings.contentLanguage")}
              </label>
              <p className="text-sm text-muted-foreground mb-2">
                {t("settings.contentLanguageDescription")}
              </p>
              <Select value={contentLanguage} onValueChange={changeContentLanguage}>
                <SelectTrigger className="w-full sm:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableLanguages.map((lang) => (
                    <SelectItem key={`content-${lang.code}`} value={lang.code}>
                      <span className="mr-2 font-mono text-xs text-muted-foreground">{lang.short}</span>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-xl bg-card p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-medium text-foreground">{t("settings.notifications")}</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{t("settings.emailAlerts")}</p>
                <p className="text-sm text-muted-foreground">{t("settings.emailAlertsDescription")}</p>
              </div>
              <Switch disabled />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{t("settings.weeklyDigest")}</p>
                <p className="text-sm text-muted-foreground">{t("settings.weeklyDigestDescription")}</p>
              </div>
              <Switch disabled />
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground italic">{t("settings.comingSoon")}</p>
        </div>

        {/* User Info */}
        <div className="rounded-xl bg-card p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-medium text-foreground">{t("settings.personalInfo")}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-muted-foreground">{t("settings.email")}</label>
              <p className="mt-1 text-foreground">{user?.email || "—"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">{t("settings.fullName")}</label>
              <p className="mt-1 text-foreground">{profile?.full_name || t("settings.notSpecified")}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">{t("settings.role")}</label>
              <p className="mt-1">
                {profile?.role ? (
                  <Badge variant="secondary">{profile.role}</Badge>
                ) : (
                  <span className="text-foreground">{t("settings.notSpecified")}</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Account Info */}
        {account && (
          <div className="rounded-xl bg-card p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-heading font-medium text-foreground">{t("settings.organization")}</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground">{t("settings.companyName")}</label>
                <p className="mt-1 text-foreground">{account.company_name || t("settings.notSpecified")}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">{t("settings.plan")}</label>
                <p className="mt-1">
                  {account.tier ? (
                    <Badge variant="default">{account.tier}</Badge>
                  ) : (
                    <span className="text-foreground">{t("settings.notSpecified")}</span>
                  )}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">{t("settings.status")}</label>
                <p className="mt-1">
                  {account.status ? (
                    <Badge 
                      variant={account.status === "active" ? "default" : "secondary"}
                    >
                      {account.status}
                    </Badge>
                  ) : (
                    <span className="text-foreground">—</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Security */}
        <div className="rounded-xl bg-card p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-medium text-foreground">{t("settings.security")}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-muted-foreground">{t("settings.accountId")}</label>
              <p className="mt-1 text-foreground font-mono text-sm">
                {profile?.account_id || "—"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">{t("settings.userId")}</label>
              <p className="mt-1 text-foreground font-mono text-sm">
                {user?.id || "—"}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <Button variant="outline" size="sm" disabled>
              <Lock className="h-4 w-4 mr-2" />
              {t("settings.changePassword")}
            </Button>
            <p className="mt-2 text-xs text-muted-foreground italic">{t("settings.comingSoon")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
