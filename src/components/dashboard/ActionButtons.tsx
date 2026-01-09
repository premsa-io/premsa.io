import { FileText, RefreshCw, Lightbulb, Loader2, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/lib/AuthContext";
import { useN8nAction } from "@/hooks/useN8nAction";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ActionButtonProps {
  action: "generateReport" | "refreshAlerts" | "requestInterpretation";
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  showLabel?: boolean;
  className?: string;
  matchId?: string;
  topicId?: string;
}

const actionConfig = {
  generateReport: {
    icon: FileText,
    labelKey: "actions.generateReport",
    tooltipKey: "actions.generateReportTooltip",
  },
  refreshAlerts: {
    icon: RefreshCw,
    labelKey: "actions.refreshAlerts",
    tooltipKey: "actions.refreshAlertsTooltip",
  },
  requestInterpretation: {
    icon: Lightbulb,
    labelKey: "actions.requestInterpretation",
    tooltipKey: "actions.requestInterpretationTooltip",
  },
};

export const ActionButton = ({
  action,
  variant = "outline",
  size = "sm",
  showLabel = true,
  className = "",
  matchId,
  topicId,
}: ActionButtonProps) => {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const { execute, isLoading, isSuccess } = useN8nAction(action);

  const config = actionConfig[action];
  const Icon = config.icon;

  const handleClick = async () => {
    await execute(profile?.account_id, { matchId, topicId });
  };

  const buttonContent = (
    <>
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isSuccess ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Icon className="h-4 w-4" />
      )}
      {showLabel && <span className="ml-2">{t(config.labelKey)}</span>}
    </>
  );

  if (!showLabel) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={variant}
              size={size}
              onClick={handleClick}
              disabled={isLoading}
              className={className}
            >
              {buttonContent}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t(config.tooltipKey)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={isLoading}
      className={className}
    >
      {buttonContent}
    </Button>
  );
};

export const DashboardActionButtons = () => {
  return (
    <div className="flex items-center gap-2">
      <ActionButton action="generateReport" variant="outline" size="sm" />
      <ActionButton action="refreshAlerts" variant="outline" size="sm" />
    </div>
  );
};
