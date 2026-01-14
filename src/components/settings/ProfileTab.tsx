import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/AuthContext";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { User, Camera, Pencil, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProfileFormData {
  full_name: string;
  phone: string;
  job_title: string;
}

export const ProfileTab = () => {
  const { t } = useTranslation();
  const { user, profile } = useAuth();
  const { currentLanguage, contentLanguage, changeLanguage, changeContentLanguage, availableLanguages } = useLanguage();
  
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: profile?.full_name || "",
    phone: "",
    job_title: "",
  });

  // Email change state
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    if (!profile?.id) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("user_profiles" as any)
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          job_title: formData.job_title,
        })
        .eq("id", profile.id);

      if (error) throw error;
      toast.success(t("settings.profile.saveSuccess"));
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error(t("settings.profile.saveError"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleEmailChange = async () => {
    if (!newEmail || newEmail === user?.email) {
      setIsEditingEmail(false);
      setNewEmail("");
      return;
    }

    setIsUpdatingEmail(true);
    try {
      const { error } = await supabase.auth.updateUser({ 
        email: newEmail 
      });
      if (error) throw error;
      toast.success(t("settings.profile.emailVerificationSent"));
      setIsEditingEmail(false);
      setNewEmail("");
    } catch (error) {
      console.error("Error updating email:", error);
      toast.error(t("settings.profile.emailChangeError"));
    } finally {
      setIsUpdatingEmail(false);
    }
  };

  const handleCancelEmailEdit = () => {
    setIsEditingEmail(false);
    setNewEmail("");
  };

  const getInitials = (name: string | null) => {
    if (!name) return user?.email?.charAt(0).toUpperCase() || "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="space-y-8">
      {/* Avatar Section */}
      <div className="flex items-start gap-6">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarImage src="" alt={profile?.full_name || ""} />
            <AvatarFallback className="text-xl bg-primary/10 text-primary">
              {getInitials(profile?.full_name)}
            </AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            variant="secondary"
            className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
            disabled
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm text-muted-foreground">{t("settings.profile.avatarHint")}</p>
          <p className="text-xs text-muted-foreground italic">{t("settings.comingSoon")}</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="full_name">{t("settings.profile.fullName")}</Label>
          <Input
            id="full_name"
            value={formData.full_name}
            onChange={(e) => handleInputChange("full_name", e.target.value)}
            placeholder={t("settings.profile.fullNamePlaceholder")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t("settings.profile.email")}</Label>
          {isEditingEmail ? (
            <div className="flex gap-2">
              <Input
                id="new_email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder={user?.email || ""}
                className="flex-1"
                autoFocus
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={handleEmailChange}
                disabled={isUpdatingEmail || !newEmail}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleCancelEmailEdit}
                disabled={isUpdatingEmail}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                id="email"
                value={user?.email || ""}
                disabled
                className="bg-muted flex-1"
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setIsEditingEmail(true);
                  setNewEmail(user?.email || "");
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            {isEditingEmail 
              ? t("settings.profile.emailChangeHint")
              : t("settings.profile.emailHint")
            }
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{t("settings.profile.phone")}</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder={t("settings.profile.phonePlaceholder")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="job_title">{t("settings.profile.jobTitle")}</Label>
          <Input
            id="job_title"
            value={formData.job_title}
            onChange={(e) => handleInputChange("job_title", e.target.value)}
            placeholder={t("settings.profile.jobTitlePlaceholder")}
          />
        </div>
      </div>

      {/* Language Section */}
      <div className="pt-6 border-t border-border">
        <h3 className="text-base font-medium mb-4">{t("settings.languageSection")}</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>{t("settings.interfaceLanguage")}</Label>
            <p className="text-sm text-muted-foreground mb-2">{t("settings.interfaceLanguageDescription")}</p>
            <Select value={currentLanguage} onValueChange={changeLanguage}>
              <SelectTrigger className="w-full">
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

          <div className="space-y-2">
            <Label>{t("settings.contentLanguage")}</Label>
            <p className="text-sm text-muted-foreground mb-2">{t("settings.contentLanguageDescription")}</p>
            <Select value={contentLanguage} onValueChange={changeContentLanguage}>
              <SelectTrigger className="w-full">
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

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <Button onClick={handleSaveProfile} disabled={isSaving}>
          {isSaving ? t("common.saving") : t("settings.profile.saveChanges")}
        </Button>
      </div>
    </div>
  );
};