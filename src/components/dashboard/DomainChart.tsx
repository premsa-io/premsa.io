import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
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

export const DomainChart = ({ domains, isLoading }: DomainChartProps) => {
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
        No hi ha dades disponibles
      </div>
    );
  }

  const total = domains.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="flex items-center gap-6">
      <div className="h-[180px] w-[180px] flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={domains}
              dataKey="count"
              nameKey="domain"
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={80}
              paddingAngle={2}
            >
              {domains.map((_, index) => (
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
        {domains.slice(0, 5).map((domain, index) => (
          <div key={domain.domain} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-sm text-foreground truncate flex-1">{domain.domain}</span>
            <span className="text-sm font-medium text-muted-foreground">{domain.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
