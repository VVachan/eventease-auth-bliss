import { useState, useMemo } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight, CalendarDays, Loader2 } from "lucide-react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEvents } from "@/hooks/useEvents";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import type { User } from "@supabase/supabase-js";

const CalendarPage = () => {
  const { user } = useOutletContext<{ user: User }>();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { events, loading } = useEvents(user);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const eventsMap = useMemo(() => {
    const map = new Map<string, typeof events>();
    events.forEach((event) => {
      const dateKey = format(new Date(event.event_date), "yyyy-MM-dd");
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)!.push(event);
    });
    return map;
  }, [events]);

  const todayEvents = useMemo(() => {
    const todayKey = format(new Date(), "yyyy-MM-dd");
    return eventsMap.get(todayKey) || [];
  }, [eventsMap]);

  const firstDayOfMonth = startOfMonth(currentMonth).getDay();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-display font-bold text-foreground">{t("calendar")}</h1>
          <p className="text-muted-foreground">View all your events in calendar format.</p>
        </div>
        <Button variant="outline" onClick={() => setCurrentMonth(new Date())}>
          {t("today")}
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Grid */}
          <div className="lg:col-span-3 rounded-xl border border-[hsl(270,65%,55%)]/30 bg-[hsl(270,65%,55%)]/10 backdrop-blur-xl p-4 md:p-6">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h2 className="text-xl font-semibold text-foreground">
                {format(currentMonth, "MMMM yyyy")}
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before the first day of month */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {days.map((day) => {
                const dateKey = format(day, "yyyy-MM-dd");
                const dayEvents = eventsMap.get(dateKey) || [];
                const hasEvents = dayEvents.length > 0;

                return (
                  <div
                    key={dateKey}
                    className={cn(
                      "aspect-square p-1 rounded-lg transition-all cursor-pointer hover:bg-primary/10",
                      isToday(day) && "bg-primary/20 ring-2 ring-primary",
                      !isSameMonth(day, currentMonth) && "opacity-40"
                    )}
                    onClick={() => hasEvents && navigate("/browse-events")}
                  >
                    <div className="h-full flex flex-col">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isToday(day) ? "text-primary" : "text-foreground"
                        )}
                      >
                        {format(day, "d")}
                      </span>
                      {hasEvents && (
                        <div className="flex-1 flex items-end justify-center pb-1">
                          <div className="flex gap-0.5">
                            {dayEvents.slice(0, 3).map((_, i) => (
                              <div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-accent"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Today's Events Sidebar */}
          <div className="rounded-xl border border-[hsl(270,65%,55%)]/30 bg-[hsl(270,65%,55%)]/10 backdrop-blur-xl p-4">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary" />
              {t("today")} - {format(new Date(), "MMM d")}
            </h3>

            {todayEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("noEventsToday")}</p>
            ) : (
              <div className="space-y-3">
                {todayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-3 rounded-lg bg-card/50 border border-border/50 hover:border-primary/50 transition-colors cursor-pointer"
                    onClick={() => navigate("/browse-events")}
                  >
                    <h4 className="font-medium text-foreground text-sm line-clamp-1">{event.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(event.event_date), "p")}
                    </p>
                    <Badge variant="secondary" className="text-xs mt-2">
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
