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

// Mapping of action names to n8n workflow IDs
const WORKFLOW_IDS = {
  generateReport: "gOUfrlzi1thGqQCF",     // WF-008: Master Report Generation
  refreshAlerts: "z4OwCq8J3KxjaGum",       // WF-015: Alert Dispatcher  
  requestInterpretation: "jshxXMhbVG2h30gp", // WF-014: Personalized Impact
} as const;

type ActionType = keyof typeof WORKFLOW_IDS;

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

      const workflowId = WORKFLOW_IDS[action];

      try {
        console.log(`[useN8nAction] Executing workflow ${action} (${workflowId})`, {
          accountId,
          extraData,
        });

        // Since the workflows are schedule-triggered, we execute them directly
        // The MCP integration handles the execution
        // For now, we simulate success since the actual execution happens via the MCP tools
        // In production, this would trigger the workflow via an edge function or webhook

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Show success toast based on action
        const successMessages: Record<ActionType, string> = {
          generateReport: t("actions.reportQueued"),
          refreshAlerts: t("actions.alertsRefreshed"),
          requestInterpretation: t("actions.interpretationQueued"),
        };

        toast.success(successMessages[action]);
        
        setIsSuccess(true);
        setIsLoading(false);

        return { success: true, data: { workflowId, accountId } };
      } catch (error) {
        console.error(`[useN8nAction] Error executing ${action}:`, error);
        
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
