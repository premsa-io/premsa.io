import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Building2, Camera } from "lucide-react";
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

const SECTORS = [
  "energia",
  "financer",
  "farmaceutic",
  "tecnologia",
  "telecom",
  "industrial",
  "retail",
  "serveis",
  "altres",
];

interface CompanyFormData {
  company_name: string;
  tax_id: string;
  sector: string;
  website: string;
  billing_street: string;
  billing_city: string;
  billing_postal_code: string;
}

export const CompanyTab = () => {
  const { t } = useTranslation();
  const { profile, account } = useAuth();
  
  const isAdmin = profile?.role === "org_admin";
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<CompanyFormData>({
    company_name: account?.company_name || "",
    tax_id: "",
    sector: account?.sector || "",
    website: "",
    billing_street: "",
    billing_city: "",
    billing_postal_code: "",
  });

  const handleInputChange = (field: keyof CompanyFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!account?.id || !isAdmin) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("accounts" as any)
        .update({
          company_name: formData.company_name,
          tax_id: formData.tax_id,
          sector: formData.sector,
          website: formData.website,
          billing_address: {
            street: formData.billing_street,
            city: formData.billing_city,
            postal_code: formData.billing_postal_code,
          },
        })
        .eq("id", account.id);

      if (error) throw error;
      toast.success(t("settings.company.saveSuccess"));
    } catch (error) {
      console.error("Error saving company:", error);
      toast.error(t("settings.company.saveError"));
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return "C";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="space-y-8">
      {/* Admin Notice */}
      {!isAdmin && (
        <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
          {t("settings.company.viewOnlyNotice")}
        </div>
      )}

      {/* Logo Section */}
      <div className="flex items-start gap-6">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarImage src="" alt={account?.company_name || ""} />
            <AvatarFallback className="text-xl bg-primary/10 text-primary">
              {getInitials(account?.company_name)}
            </AvatarFallback>
          </Avatar>
          {isAdmin && (
            <Button
              size="icon"
              variant="secondary"
              className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
              disabled
            >
              <Camera className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm text-muted-foreground">{t("settings.company.logoHint")}</p>
          <p className="text-xs text-muted-foreground italic">{t("settings.comingSoon")}</p>
        </div>
      </div>

      {/* Company Details */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company_name">{t("settings.company.companyName")}</Label>
          <Input
            id="company_name"
            value={formData.company_name}
            onChange={(e) => handleInputChange("company_name", e.target.value)}
            disabled={!isAdmin}
            placeholder={t("settings.company.companyNamePlaceholder")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tax_id">{t("settings.company.taxId")}</Label>
          <Input
            id="tax_id"
            value={formData.tax_id}
            onChange={(e) => handleInputChange("tax_id", e.target.value)}
            disabled={!isAdmin}
            placeholder="B12345678"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sector">{t("settings.company.sector")}</Label>
          <Select 
            value={formData.sector} 
            onValueChange={(value) => handleInputChange("sector", value)}
            disabled={!isAdmin}
          >
            <SelectTrigger>
              <SelectValue placeholder={t("settings.company.selectSector")} />
            </SelectTrigger>
            <SelectContent>
              {SECTORS.map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {t(`onboarding.sectors.${sector}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">{t("settings.company.website")}</Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            disabled={!isAdmin}
            placeholder="https://example.com"
          />
        </div>
      </div>

      {/* Billing Address */}
      <div className="pt-6 border-t border-border">
        <h3 className="text-base font-medium mb-4">{t("settings.company.billingAddress")}</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="billing_street">{t("settings.company.street")}</Label>
            <Input
              id="billing_street"
              value={formData.billing_street}
              onChange={(e) => handleInputChange("billing_street", e.target.value)}
              disabled={!isAdmin}
              placeholder={t("settings.company.streetPlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="billing_city">{t("settings.company.city")}</Label>
            <Input
              id="billing_city"
              value={formData.billing_city}
              onChange={(e) => handleInputChange("billing_city", e.target.value)}
              disabled={!isAdmin}
              placeholder={t("settings.company.cityPlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="billing_postal_code">{t("settings.company.postalCode")}</Label>
            <Input
              id="billing_postal_code"
              value={formData.billing_postal_code}
              onChange={(e) => handleInputChange("billing_postal_code", e.target.value)}
              disabled={!isAdmin}
              placeholder="08001"
            />
          </div>

          <div className="space-y-2">
            <Label>{t("settings.company.country")}</Label>
            <Input
              value={account?.countries_of_operation?.[0] || "España"}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">{t("settings.company.countryHint")}</p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      {isAdmin && (
        <div className="flex justify-end pt-4">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? t("common.saving") : t("settings.company.saveChanges")}
          </Button>
        </div>
      )}
    </div>
  );
};
