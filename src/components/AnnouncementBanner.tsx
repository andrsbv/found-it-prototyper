import { Megaphone, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AnnouncementBannerProps {
  message: string;
  variant?: "info" | "warning" | "success";
  dismissible?: boolean;
}

export const AnnouncementBanner = ({ 
  message, 
  variant = "info", 
  dismissible = true 
}: AnnouncementBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const variantStyles = {
    info: "bg-info/10 border-info",
    warning: "bg-warning/10 border-warning",
    success: "bg-success/10 border-success",
  };

  const textStyles = {
    info: "text-info",
    warning: "text-warning",
    success: "text-success",
  };

  const iconStyles = {
    info: "text-info",
    warning: "text-warning",
    success: "text-success",
  };

  return (
    <div className={cn(
      "relative flex items-center gap-3 rounded-lg border p-3 mb-4",
      variantStyles[variant]
    )}>
      <Megaphone className={cn("h-5 w-5 flex-shrink-0", textStyles[variant])} />
      <p className={cn("text-sm flex-1", textStyles[variant])}>{message}</p>
      {dismissible && (
        <button 
          onClick={() => setIsVisible(false)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
