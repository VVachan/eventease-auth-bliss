import { Ticket, Loader2, Search } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/events/EventCard";
import { useEvents } from "@/hooks/useEvents";
import type { User } from "@supabase/supabase-js";
import { useState } from "react";

const Registrations = () => {
  const { user } = useOutletContext<{ user: User }>();
  const navigate = useNavigate();
  const { registeredEvents, loading, error, registerForEvent, unregisterFromEvent } = useEvents(user);
  const [actionLoading, setActionLoading] = useState(false);

  const handleRegister = async (eventId: string) => {
    setActionLoading(true);
    await registerForEvent(eventId);
    setActionLoading(false);
  };

  const handleUnregister = async (eventId: string) => {
    setActionLoading(true);
    await unregisterFromEvent(eventId);
    setActionLoading(false);
  };

  if (error) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-8 text-center">
          <p className="text-destructive">Error loading registrations: {error}</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-display font-bold text-foreground">My Registrations</h1>
          <p className="text-muted-foreground">Events you've registered for.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : registeredEvents.length === 0 ? (
        <div className="rounded-xl border border-[hsl(270,65%,55%)]/30 bg-[hsl(270,65%,55%)]/10 backdrop-blur-xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Ticket className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">No Registrations Yet</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            You haven't registered for any events yet. Browse events to find something interesting!
          </p>
          <Button onClick={() => navigate("/browse-events")} className="gap-2">
            <Search className="w-4 h-4" />
            Browse Events
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {registeredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              currentUserId={user.id}
              onRegister={handleRegister}
              onUnregister={handleUnregister}
              isLoading={actionLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Registrations;
