import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface N8nActionResult {
  success: boolean;
  data?: any;
  error?: string;
}

interface UseN8nActionReturn {
  execute: (accountId?: string, extraData?: Record<string, any>) => Promise<N8nActionResult>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  reset: () => void;
}

// Direct webhook URLs for n8n workflows
const WEBHOOK_URLS = {
  generateReport: "https://premsa.app.n8n.cloud/webhook/generate-report",
  refreshAlerts: "https://premsa.app.n8n.cloud/webhook/refresh-alerts",
  requestInterpretation: "https://premsa.app.n8n.cloud/webhook/request-interpretation",
} as const;

type ActionType = keyof typeof WEBHOOK_URLS;

export const useN8nAction = (action: ActionType): UseN8nActionReturn => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const reset = useCallback(() => {
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
  }, []);

  const execute = useCallback(
    async (accountId?: string, extraData?: Record<string, any>): Promise<N8nActionResult> => {
      setIsLoading(true);
      setIsSuccess(false);
      setIsError(false);

      const webhookUrl = WEBHOOK_URLS[action];

      try {
        console.log(`[useN8nAction] Calling webhook ${action}`, {
          url: webhookUrl,
          accountId,
          extraData,
        });

        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            account_id: accountId,
            triggered_by: "dashboard",
            ...extraData,
          }),
        });

        if (!response.ok) {
          throw new Error(`Webhook failed with status ${response.status}`);
        }

        const data = await response.json().catch(() => ({}));

        // Show success toast based on action
        const successMessages: Record<ActionType, string> = {
          generateReport: t("actions.reportQueued"),
          refreshAlerts: t("actions.alertsRefreshed"),
          requestInterpretation: t("actions.interpretationQueued"),
        };

        toast.success(successMessages[action]);
        
        setIsSuccess(true);
        setIsLoading(false);

        return { success: true, data };
      } catch (error) {
        console.error(`[useN8nAction] Error calling ${action}:`, error);
        
        setIsError(true);
        setIsLoading(false);

        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        toast.error(t("common.error"), { description: errorMessage });

        return { success: false, error: errorMessage };
      }
    },
    [action, t]
  );

  return { execute, isLoading, isSuccess, isError, reset };
};
