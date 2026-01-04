import { CalendarDays, CalendarCheck, Ticket, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { useOutletContext } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import type { User } from "@supabase/supabase-js";

const Dashboard = () => {
  const { user } = useOutletContext<{ user: User }>();
  const { t } = useLanguage();
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-display font-bold text-foreground">
          {t("welcomeBack")}, {displayName}! 👋
        </h1>
        <p className="text-muted-foreground">
          {t("dashboardSubtitle")}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t("totalEvents")}
          value={12}
          icon={CalendarDays}
          description={t("allYourEvents")}
          variant="primary"
        />
        <StatCard
          title={t("upcomingEvents")}
          value={5}
          icon={CalendarCheck}
          description={t("next30Days")}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title={t("registeredEvents")}
          value={8}
          icon={Ticket}
          description={t("eventsAttending")}
        />
        <StatCard
          title={t("thisMonth")}
          value={3}
          icon={TrendingUp}
          description={t("eventsCreated")}
          trend={{ value: 25, isPositive: true }}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-foreground mb-4">{t("recentActivity")}</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CalendarDays className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{t("sampleEvent")} {i}</p>
                  <p className="text-xs text-muted-foreground">{t("createdDaysAgo")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
          <h2 className="text-lg font-semibold text-foreground mb-4">{t("upcomingSchedule")}</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                <div className="text-center min-w-[50px]">
                  <p className="text-xs text-muted-foreground uppercase">Jan</p>
                  <p className="text-xl font-bold text-foreground">{10 + i}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{t("upcomingEvent")} {i}</p>
                  <p className="text-xs text-muted-foreground">10:00 AM - 2:00 PM</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
