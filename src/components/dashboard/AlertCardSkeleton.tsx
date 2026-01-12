import { Skeleton } from "@/components/ui/skeleton";

export const AlertCardSkeleton = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <div className="flex items-center gap-2 pt-1">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <div className="flex-shrink-0 text-right space-y-1">
          <Skeleton className="h-6 w-8 ml-auto" />
          <Skeleton className="h-3 w-10 ml-auto" />
        </div>
      </div>
    </div>
  );
};
