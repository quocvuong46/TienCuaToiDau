interface SkeletonProps {
  className?: string;
  rounded?: string;
}

export default function Skeleton({ className = "", rounded = "rounded-lg" }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-white/[0.06] ${rounded} ${className}`} />
  );
}
