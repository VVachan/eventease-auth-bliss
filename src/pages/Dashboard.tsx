import { CalendarDays, Plus, ArrowRight, Sparkles } from "lucide-react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import type { User } from "@supabase/supabase-js";
import heroImage from "@/assets/hero-event.jpg";

const Dashboard = () => {
  const { user } = useOutletContext<{ user: User }>();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section with Image */}
      <div className="relative rounded-2xl overflow-hidden">
        <img 
          src={heroImage} 
          alt="Luxury event venue" 
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(270,40%,15%)]/90 via-[hsl(270,40%,20%)]/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <p className="text-accent text-sm font-medium">{t("welcomeBack")}</p>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
            {displayName}
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-md">
            Create unforgettable experiences with EventEase
          </p>
        </div>
      </div>

      {/* Quick Actions - Glassy Purple Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={() => navigate("/create-event")}
          className="group p-6 rounded-xl border border-[hsl(270,65%,55%)]/30 bg-[hsl(270,65%,55%)]/10 backdrop-blur-xl hover:bg-[hsl(270,65%,55%)]/20 hover:border-[hsl(270,65%,55%)]/50 transition-all duration-200 text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
            <Plus className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">{t("createEvent")}</h3>
          <p className="text-sm text-muted-foreground">Start planning your next event</p>
        </button>

        <button
          onClick={() => navigate("/browse-events")}
          className="group p-6 rounded-xl border border-[hsl(270,65%,55%)]/30 bg-[hsl(270,65%,55%)]/10 backdrop-blur-xl hover:bg-[hsl(270,65%,55%)]/20 hover:border-[hsl(270,65%,55%)]/50 transition-all duration-200 text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
            <CalendarDays className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">{t("browseEvents")}</h3>
          <p className="text-sm text-muted-foreground">Discover events near you</p>
        </button>

        <button
          onClick={() => navigate("/calendar")}
          className="group p-6 rounded-xl border border-[hsl(270,65%,55%)]/30 bg-[hsl(270,65%,55%)]/10 backdrop-blur-xl hover:bg-[hsl(270,65%,55%)]/20 hover:border-[hsl(270,65%,55%)]/50 transition-all duration-200 text-left sm:col-span-2 lg:col-span-1"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <ArrowRight className="w-6 h-6 text-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">{t("calendar")}</h3>
          <p className="text-sm text-muted-foreground">View your schedule</p>
        </button>
      </div>

      {/* Empty State - My Events - Glassy Purple */}
      <div className="rounded-xl border border-[hsl(270,65%,55%)]/30 bg-[hsl(270,65%,55%)]/10 backdrop-blur-xl p-8">
        <div className="flex flex-col items-center justify-center text-center py-8">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <CalendarDays className="w-8 h-8 text-primary" />
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

      {/* Info Section - Glassy Purple */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[hsl(270,65%,55%)]/30 bg-[hsl(270,65%,55%)]/10 backdrop-blur-xl p-6">
          <h3 className="font-semibold text-foreground mb-3">{t("upcomingEvents")}</h3>
          <p className="text-sm text-muted-foreground">No upcoming events scheduled.</p>
        </div>
        <div className="rounded-xl border border-[hsl(270,65%,55%)]/30 bg-[hsl(270,65%,55%)]/10 backdrop-blur-xl p-6">
          <h3 className="font-semibold text-foreground mb-3">{t("registeredEvents")}</h3>
          <p className="text-sm text-muted-foreground">You haven't registered for any events.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
