import { CalendarDays, Plus, ArrowRight } from "lucide-react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import type { User } from "@supabase/supabase-js";

const Dashboard = () => {
  const { user } = useOutletContext<{ user: User }>();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-muted-foreground text-sm">{t("welcomeBack")},</p>
        <h1 className="text-2xl font-display font-bold text-foreground">
          {displayName}
        </h1>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={() => navigate("/create-event")}
          className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-all duration-200 text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <Plus className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">{t("createEvent")}</h3>
          <p className="text-sm text-muted-foreground">Start planning your next event</p>
        </button>

        <button
          onClick={() => navigate("/browse-events")}
          className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-all duration-200 text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
            <CalendarDays className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">{t("browseEvents")}</h3>
          <p className="text-sm text-muted-foreground">Discover events near you</p>
        </button>

        <button
          onClick={() => navigate("/calendar")}
          className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-all duration-200 text-left sm:col-span-2 lg:col-span-1"
        >
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-secondary/80 transition-colors">
            <ArrowRight className="w-6 h-6 text-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">{t("calendar")}</h3>
          <p className="text-sm text-muted-foreground">View your schedule</p>
        </button>
      </div>

      {/* Empty State - My Events */}
      <div className="rounded-xl border border-border bg-card p-8">
        <div className="flex flex-col items-center justify-center text-center py-8">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <CalendarDays className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-2">No events yet</h2>
          <p className="text-muted-foreground text-sm max-w-sm mb-6">
            Create your first event or browse existing ones to get started.
          </p>
          <Button onClick={() => navigate("/create-event")} className="gap-2">
            <Plus className="w-4 h-4" />
            {t("createEvent")}
          </Button>
        </div>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-3">{t("upcomingEvents")}</h3>
          <p className="text-sm text-muted-foreground">No upcoming events scheduled.</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-3">{t("registeredEvents")}</h3>
          <p className="text-sm text-muted-foreground">You haven't registered for any events.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
