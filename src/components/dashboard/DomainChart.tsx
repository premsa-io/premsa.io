import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useTranslation } from "react-i18next";
import { DomainData } from "@/hooks/useDomainBreakdown";
import { Skeleton } from "@/components/ui/skeleton";

interface DomainChartProps {
  domains: DomainData[];
  isLoading: boolean;
}

const COLORS = [
  "hsl(210, 72%, 15%)",   // primary
  "hsl(210, 50%, 30%)",
  "hsl(210, 40%, 45%)",
  "hsl(210, 35%, 55%)",
  "hsl(210, 30%, 65%)",
  "hsl(210, 25%, 75%)",
];

// Map domain keys to translation keys
const domainKeyMap: Record<string, string> = {
  "administrativo": "administrative",
  "fiscal": "fiscal",
  "laboral": "labor",
  "sanidad": "health",
  "educación": "education",
  "medio ambiente": "environment",
  "energía": "energy",
  "transporte": "transport",
  "telecomunicaciones": "telecoms",
  "protección de datos": "data_protection",
  "consumo": "consumer",
  "competencia": "competition",
  "financiero": "financial",
  "urbanismo": "urban_planning",
  "contratación pública": "public_contracts",
};

const getDomainTranslationKey = (domain: string): string => {
  const lowerDomain = domain.toLowerCase();
  return domainKeyMap[lowerDomain] || lowerDomain.replace(/\s+/g, "_");
};

export const DomainChart = ({ domains, isLoading }: DomainChartProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <Skeleton className="h-32 w-32 rounded-full" />
      </div>
    );
  }

  if (domains.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px] text-muted-foreground">
        {t("dashboard.noData")}
      </div>
    );
  }

  const total = domains.reduce((sum, d) => sum + d.count, 0);

  // Translate domain names
  const translatedDomains = domains.map((d) => ({
    ...d,
    displayName: t(`domains.${getDomainTranslationKey(d.domain)}`, { defaultValue: d.domain }),
  }));

  return (
    <div className="flex items-center gap-6">
      <div className="h-[180px] w-[180px] flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={translatedDomains}
              dataKey="count"
              nameKey="displayName"
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={80}
              paddingAngle={2}
            >
              {translatedDomains.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value} (${Math.round((value / total) * 100)}%)`, "Matches"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1 space-y-2">
        {translatedDomains.slice(0, 5).map((domain, index) => (
          <div key={domain.domain} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-sm text-foreground truncate flex-1">{domain.displayName}</span>
            <span className="text-sm font-medium text-muted-foreground">{domain.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
