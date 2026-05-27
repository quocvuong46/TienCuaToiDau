import Skeleton from "@/components/ui/Skeleton";
import GlassCard from "@/components/ui/GlassCard";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <GlassCard key={i} padding="p-5">
            <Skeleton className="h-9 w-9 rounded-xl" />
            <Skeleton className="mt-4 h-3 w-20" />
            <Skeleton className="mt-2 h-7 w-32" />
          </GlassCard>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2" padding="p-6">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="mt-4 h-64 w-full" />
        </GlassCard>
        <GlassCard padding="p-6">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-4 h-64 w-full rounded-full" />
        </GlassCard>
      </div>
    </div>
  );
}
