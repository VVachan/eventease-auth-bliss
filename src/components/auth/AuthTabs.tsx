import { cn } from "@/lib/utils";

interface AuthTabsProps {
  activeTab: "login" | "signup";
  onTabChange: (tab: "login" | "signup") => void;
}

export const AuthTabs = ({ activeTab, onTabChange }: AuthTabsProps) => {
  return (
    <div className="flex gap-1 p-1 bg-secondary rounded-lg mb-8">
      <button
        onClick={() => onTabChange("login")}
        className={cn(
          "flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200",
          activeTab === "login"
            ? "bg-card text-foreground shadow-soft"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Sign In
      </button>
      <button
        onClick={() => onTabChange("signup")}
        className={cn(
          "flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200",
          activeTab === "signup"
            ? "bg-card text-foreground shadow-soft"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Sign Up
      </button>
    </div>
  );
};
