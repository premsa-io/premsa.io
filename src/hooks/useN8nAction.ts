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

// Edge Function proxy URL
const N8N_PROXY_URL = "https://evdrqasjbwputqqejqqe.supabase.co/functions/v1/n8n-webhook";

// Valid action types
const VALID_ACTIONS = ["generateReport", "refreshAlerts", "requestInterpretation"] as const;
type ActionType = typeof VALID_ACTIONS[number];

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

      try {
        console.log(`[useN8nAction] Calling proxy for ${action}`, {
          accountId,
          extraData,
        });

        const response = await fetch(N8N_PROXY_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action,
            account_id: accountId,
            ...extraData,
          }),
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok || result.error) {
          throw new Error(result.error || `Failed with status ${response.status}`);
        }

        // Show success toast based on action
        const successMessages: Record<ActionType, string> = {
          generateReport: t("actions.reportQueued"),
          refreshAlerts: t("actions.alertsRefreshed"),
          requestInterpretation: t("actions.interpretationQueued"),
        };

        toast.success(successMessages[action]);
        
        setIsSuccess(true);
        setIsLoading(false);

        return { success: true, data: result };
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
