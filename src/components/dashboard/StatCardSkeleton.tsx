import { Skeleton } from "@/components/ui/skeleton";

export const StatCardSkeleton = () => {
  return (
    <div className="rounded-xl bg-card p-6 border border-border">
      <Skeleton className="h-6 w-6 rounded" />
      <Skeleton className="mt-2 h-8 w-16" />
      <Skeleton className="mt-1 h-4 w-24" />
    </div>
  );
};
