import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { reinitializeGA } from "@/lib/analytics";

const COOKIE_CONSENT_KEY = "premsa-cookie-consent";

type ConsentType = "all" | "essential" | "custom" | null;

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const saveConsent = (type: ConsentType, customPrefs?: CookiePreferences) => {
    const consent = {
      type,
      preferences: customPrefs || preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    const allPrefs = { essential: true, analytics: true, marketing: true };
    setPreferences(allPrefs);
    saveConsent("all", allPrefs);
    reinitializeGA();
  };

  const handleEssentialOnly = () => {
    const essentialPrefs = { essential: true, analytics: false, marketing: false };
    setPreferences(essentialPrefs);
    saveConsent("essential", essentialPrefs);
  };

  const handleSaveCustom = () => {
    saveConsent("custom", preferences);
    if (preferences.analytics) {
      reinitializeGA();
    }
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-gray-200 bg-white shadow-lg">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
          <div className="flex items-center gap-3">
            <Cookie className="h-5 w-5 shrink-0 text-primary-900" />
            <p className="font-body text-sm text-gray-700">
              Usem cookies per millorar la teva experiència.{" "}
              <Link
                to="/legal/cookies"
                className="font-medium text-primary-700 underline"
              >
                Més info
              </Link>
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-3">
            <Button
              onClick={handleAcceptAll}
              className="w-full bg-primary-900 text-white hover:bg-primary-800 sm:w-auto"
            >
              Acceptar Tot
            </Button>
            <Button
              onClick={handleEssentialOnly}
              variant="outline"
              className="w-full border-primary-900 text-primary-900 hover:bg-primary-50 sm:w-auto"
            >
              Només Essencials
            </Button>
            <Button
              onClick={() => setShowSettings(true)}
              variant="ghost"
              className="w-full text-primary-700 underline hover:bg-transparent hover:text-primary-900 sm:w-auto"
            >
              Configurar
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="bg-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl font-bold text-primary-900">
              Configuració de Cookies
            </DialogTitle>
            <DialogDescription className="font-body text-sm text-gray-600">
              Tria quines cookies vols acceptar.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Essential - Always on */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-body text-sm font-medium text-gray-900">
                  Essencials
                </Label>
                <p className="font-body text-xs text-gray-500">
                  Necessàries per al funcionament del lloc
                </p>
              </div>
              <Switch checked={true} disabled className="opacity-50" />
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-body text-sm font-medium text-gray-900">
                  Analítiques
                </Label>
                <p className="font-body text-xs text-gray-500">
                  Ens ajuden a entendre com uses el lloc
                </p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, analytics: checked })
                }
              />
            </div>

            {/* Marketing */}
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-body text-sm font-medium text-gray-900">
                  Màrqueting
                </Label>
                <p className="font-body text-xs text-gray-500">
                  Personalitzen anuncis i contingut
                </p>
              </div>
              <Switch
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, marketing: checked })
                }
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleSaveCustom}
              className="flex-1 bg-primary-900 text-white hover:bg-primary-800"
            >
              Desar preferències
            </Button>
            <Button
              onClick={() => setShowSettings(false)}
              variant="outline"
              className="border-gray-300"
            >
              Cancel·lar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieBanner;
