import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { User, Shield, Building2, CreditCard, Bell, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ProfileTab,
  SecurityTab,
  CompanyTab,
  SubscriptionTab,
  NotificationsTab,
  TeamTab,
} from "@/components/settings";

const SettingsPageSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-10 w-full max-w-2xl" />
    <div className="rounded-xl bg-card p-6 border border-border">
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full max-w-md" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SettingsPage = () => {
  const { t } = useTranslation();
  const { loading, profile } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const activeTab = searchParams.get("tab") || "profile";
  const isAdmin = profile?.role === "org_admin";

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

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

  const tabs = [
    { id: "profile", icon: User, labelKey: "settings.tabs.profile" },
    { id: "security", icon: Shield, labelKey: "settings.tabs.security" },
    { id: "company", icon: Building2, labelKey: "settings.tabs.company" },
    { id: "subscription", icon: CreditCard, labelKey: "settings.tabs.subscription" },
    { id: "notifications", icon: Bell, labelKey: "settings.tabs.notifications" },
    ...(isAdmin ? [{ id: "team", icon: Users, labelKey: "settings.tabs.team" }] : []),
  ];

  return (
    <div>
      <h1 className="text-2xl font-heading font-semibold text-foreground">{t("settings.title")}</h1>
      <p className="mt-2 text-muted-foreground">
        {t("settings.description")}
      </p>

      <div className="mt-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="w-full justify-start gap-1 bg-transparent p-0 flex-wrap h-auto">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 gap-2"
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{t(tab.labelKey)}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="rounded-xl bg-card p-6 border border-border">
            <TabsContent value="profile" className="m-0">
              <ProfileTab />
            </TabsContent>
            
            <TabsContent value="security" className="m-0">
              <SecurityTab />
            </TabsContent>
            
            <TabsContent value="company" className="m-0">
              <CompanyTab />
            </TabsContent>
            
            <TabsContent value="subscription" className="m-0">
              <SubscriptionTab />
            </TabsContent>
            
            <TabsContent value="notifications" className="m-0">
              <NotificationsTab />
            </TabsContent>
            
            {isAdmin && (
              <TabsContent value="team" className="m-0">
                <TeamTab />
              </TabsContent>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;
