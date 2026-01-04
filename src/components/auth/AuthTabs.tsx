import { cn } from "@/lib/utils";

interface AuthTabsProps {
  activeTab: "login" | "signup";
  onTabChange: (tab: "login" | "signup") => void;
}

export const AuthTabs = ({ activeTab, onTabChange }: AuthTabsProps) => {
  return (
    <div className="relative flex gap-1 p-1.5 bg-secondary/80 rounded-xl mb-8 backdrop-blur-sm">
      {/* Animated background pill */}
      <div 
        className={cn(
          "absolute top-1.5 h-[calc(100%-12px)] w-[calc(50%-6px)] bg-card rounded-lg shadow-soft transition-all duration-300 ease-out",
          activeTab === "signup" ? "left-[calc(50%+2px)]" : "left-1.5"
        )}
      />
      
      <button
        onClick={() => onTabChange("login")}
        className={cn(
          "relative z-10 flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors duration-200",
          activeTab === "login"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground/80"
        )}
      >
        Sign In
      </button>
      <button
        onClick={() => onTabChange("signup")}
        className={cn(
          "relative z-10 flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors duration-200",
          activeTab === "signup"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground/80"
        )}
      >
        Sign Up
      </button>
    </div>
  );
};
