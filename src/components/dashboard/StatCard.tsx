import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  icon: React.ElementType;
  value: number;
  label: string;
  isLoading: boolean;
  to?: string;
}

export const StatCard = ({ icon: Icon, value, label, isLoading, to }: StatCardProps) => {
  const cardClasses = "block rounded-xl bg-card p-6 shadow-sm border border-border transition-all duration-200 hover:shadow-md hover:border-primary/30 hover:scale-[1.02] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
  
  const content = (
    <>
      <Icon className="h-6 w-6 text-primary" />
      {isLoading ? (
        <Skeleton className="mt-2 h-8 w-16" />
      ) : (
        <p className="mt-2 font-heading text-2xl font-bold text-foreground">{value}</p>
      )}
      <p className="text-sm text-muted-foreground">{label}</p>
    </>
  );

  if (to) {
    return <Link to={to} className={cardClasses}>{content}</Link>;
  }
  
  return (
    <div 
      className={cardClasses.replace("cursor-pointer", "")} 
      tabIndex={0}
      role="article"
      aria-label={`${label}: ${value}`}
    >
      {content}
    </div>
  );
};
