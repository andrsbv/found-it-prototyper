import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  variant?: "default" | "success" | "warning" | "info";
}

export const StatCard = ({ title, value, icon, description, variant = "default" }: StatCardProps) => {
  const variantStyles = {
    default: "bg-card",
    success: "bg-success-light border-success",
    warning: "bg-warning-light border-warning",
    info: "bg-info-light border-info",
  };

  return (
    <Card className={cn("border", variantStyles[variant])}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          <div className={cn(
            "rounded-lg p-3",
            variant === "success" && "bg-success text-success-foreground",
            variant === "warning" && "bg-warning text-warning-foreground",
            variant === "info" && "bg-info text-info-foreground",
            variant === "default" && "bg-muted text-muted-foreground"
          )}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
