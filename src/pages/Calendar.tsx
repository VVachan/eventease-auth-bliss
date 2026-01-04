import { CalendarDays } from "lucide-react";

const CalendarPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-display font-bold text-foreground">Calendar</h1>
        <p className="text-muted-foreground">
          View all your events in calendar format.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-12 shadow-soft text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <CalendarDays className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Calendar View Coming Soon</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          A beautiful calendar view to manage all your events in one place.
        </p>
      </div>
    </div>
  );
};

export default CalendarPage;
