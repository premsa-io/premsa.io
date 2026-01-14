import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Bell, Mail, Clock, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import type { NotificationPreferences as DBNotificationPreferences, NotificationPreferencesInsert } from "@/types/database";

interface NotificationPreferences {
  email_alerts: boolean;
  urgent_alerts: boolean;
  daily_digest: boolean;
  weekly_digest: boolean;
  marketing: boolean;
}

export const NotificationsTab = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email_alerts: true,
    urgent_alerts: true,
    daily_digest: false,
    weekly_digest: true,
    marketing: false,
  });

  // Load preferences from database
  useEffect(() => {
    const loadPreferences = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("notification_preferences")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle<DBNotificationPreferences>();

        if (error) {
          console.error("Error loading preferences:", error);
        }

        if (data) {
          setPreferences({
            email_alerts: data.email_alerts ?? true,
            urgent_alerts: data.urgent_alerts ?? true,
            daily_digest: data.daily_digest ?? false,
            weekly_digest: data.weekly_summary ?? true,
            marketing: data.product_updates ?? false,
          });
        }
      } catch (error) {
        console.error("Error loading preferences:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, [user?.id]);

  const handleToggle = (key: keyof NotificationPreferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    if (!user?.id) return;
    
    setIsSaving(true);
    try {
      const payload: NotificationPreferencesInsert = {
        user_id: user.id,
        email_alerts: preferences.email_alerts,
        urgent_alerts: preferences.urgent_alerts,
        daily_digest: preferences.daily_digest,
        weekly_summary: preferences.weekly_digest,
        product_updates: preferences.marketing,
        updated_at: new Date().toISOString(),
      };
      
      const { error } = await supabase
        .from("notification_preferences")
        .upsert(payload, { onConflict: "user_id" });

      if (error) throw error;
      toast.success(t("settings.notifications.saveSuccess"));
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error(t("settings.notifications.saveError"));
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Alerts Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="text-base font-medium">{t("settings.notifications.alerts")}</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <Label htmlFor="email_alerts" className="text-base font-medium cursor-pointer">
                  {t("settings.notifications.emailAlerts")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t("settings.notifications.emailAlertsDescription")}
                </p>
              </div>
            </div>
            <Switch
              id="email_alerts"
              checked={preferences.email_alerts}
              onCheckedChange={() => handleToggle("email_alerts")}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="flex items-start gap-3">
              <Bell className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <Label htmlFor="urgent_alerts" className="text-base font-medium cursor-pointer">
                  {t("settings.notifications.urgentAlerts")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t("settings.notifications.urgentAlertsDescription")}
                </p>
              </div>
            </div>
            <Switch
              id="urgent_alerts"
              checked={preferences.urgent_alerts}
              onCheckedChange={() => handleToggle("urgent_alerts")}
            />
          </div>
        </div>
      </div>

      {/* Digests Section */}
      <div className="pt-6 border-t border-border space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="text-base font-medium">{t("settings.notifications.digests")}</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <Label htmlFor="daily_digest" className="text-base font-medium cursor-pointer">
                {t("settings.notifications.dailyDigest")}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t("settings.notifications.dailyDigestDescription")}
              </p>
            </div>
            <Switch
              id="daily_digest"
              checked={preferences.daily_digest}
              onCheckedChange={() => handleToggle("daily_digest")}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <Label htmlFor="weekly_digest" className="text-base font-medium cursor-pointer">
                {t("settings.notifications.weeklyDigest")}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t("settings.notifications.weeklyDigestDescription")}
              </p>
            </div>
            <Switch
              id="weekly_digest"
              checked={preferences.weekly_digest}
              onCheckedChange={() => handleToggle("weekly_digest")}
            />
          </div>
        </div>
      </div>

      {/* Communications Section */}
      <div className="pt-6 border-t border-border space-y-4">
        <div className="flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-primary" />
          <h3 className="text-base font-medium">{t("settings.notifications.communications")}</h3>
        </div>
        
        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <div>
            <Label htmlFor="marketing" className="text-base font-medium cursor-pointer">
              {t("settings.notifications.marketing")}
            </Label>
            <p className="text-sm text-muted-foreground">
              {t("settings.notifications.marketingDescription")}
            </p>
          </div>
          <Switch
            id="marketing"
            checked={preferences.marketing}
            onCheckedChange={() => handleToggle("marketing")}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? t("common.saving") : t("settings.notifications.savePreferences")}
        </Button>
      </div>
    </div>
  );
};