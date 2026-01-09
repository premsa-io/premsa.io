import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  icon: React.ElementType;
  value: number;
  label: string;
  isLoading: boolean;
}

export const StatCard = ({ icon: Icon, value, label, isLoading }: StatCardProps) => (
  <div className="rounded-xl bg-card p-6 shadow-sm border border-border">
    <Icon className="h-6 w-6 text-primary" />
    {isLoading ? (
      <Skeleton className="mt-2 h-8 w-16" />
    ) : (
      <p className="mt-2 font-heading text-2xl font-bold text-foreground">{value}</p>
    )}
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);
