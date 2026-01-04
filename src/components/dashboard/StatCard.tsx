import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "accent";
}

const variantStyles = {
  default: {
    container: "bg-card border-border",
    icon: "bg-secondary text-foreground",
  },
  primary: {
    container: "bg-primary text-primary-foreground border-primary",
    icon: "bg-primary-foreground/20 text-primary-foreground",
  },
  accent: {
    container: "bg-accent text-accent-foreground border-accent",
    icon: "bg-accent-foreground/20 text-accent-foreground",
  },
};

export const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  variant = "default",
}: StatCardProps) => {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "rounded-xl border p-6 shadow-soft transition-all duration-200 hover:shadow-medium",
        styles.container
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className={cn("text-sm font-medium", variant === "default" ? "text-muted-foreground" : "opacity-80")}>
            {title}
          </p>
          <p className="text-3xl font-bold font-display">{value}</p>
          {description && (
            <p className={cn("text-sm", variant === "default" ? "text-muted-foreground" : "opacity-70")}>
              {description}
            </p>
          )}
          {trend && (
            <p
              className={cn(
                "text-sm font-medium flex items-center gap-1",
                trend.isPositive ? "text-green-500" : "text-red-500"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              <span className={variant === "default" ? "text-muted-foreground" : "opacity-70"}>
                vs last month
              </span>
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-lg", styles.icon)}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
