import { Calendar, Star } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "light";
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-14 h-14",
};

const textSizes = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-3xl",
};

export const Logo = ({ size = "md", variant = "default" }: LogoProps) => {
  const isLight = variant === "light";
  
  return (
    <div className="flex items-center gap-3">
      <div className={`relative ${sizeClasses[size]}`}>
        <div className={`absolute inset-0 rounded-xl ${isLight ? "bg-primary-foreground/20" : "bg-primary/10"} flex items-center justify-center`}>
          <Calendar className={`${size === "lg" ? "w-7 h-7" : size === "md" ? "w-5 h-5" : "w-4 h-4"} ${isLight ? "text-primary-foreground" : "text-primary"}`} />
        </div>
        <Star 
          className={`absolute -top-1 -right-1 ${size === "lg" ? "w-5 h-5" : size === "md" ? "w-4 h-4" : "w-3 h-3"} ${isLight ? "text-accent" : "text-accent"} fill-current`} 
        />
      </div>
      <span className={`font-display font-bold ${textSizes[size]} ${isLight ? "text-primary-foreground" : "text-foreground"}`}>
        EventEase
      </span>
    </div>
  );
};
