import { useState } from "react";
import { Search, Calendar, Loader2, Plus } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventCard } from "@/components/events/EventCard";
import { useEvents } from "@/hooks/useEvents";
import type { User } from "@supabase/supabase-js";

const eventTypes = [
  "All",
  "Conference",
  "Workshop",
  "Meetup",
  "Party",
  "Wedding",
  "Corporate",
  "Concert",
  "Festival",
  "Sports",
  "Other",
];

const BrowseEvents = () => {
  const { user } = useOutletContext<{ user: User }>();
  const navigate = useNavigate();
  const { events, loading, error, registerForEvent, unregisterFromEvent, deleteEvent } = useEvents(user);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [actionLoading, setActionLoading] = useState(false);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "All" || event.type === typeFilter;
    return matchesSearch && matchesType;
  });

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

  const handleDelete = async (eventId: string) => {
    setActionLoading(true);
    await deleteEvent(eventId);
    setActionLoading(false);
  };

  if (error) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-8 text-center">
          <p className="text-destructive">Error loading events: {error}</p>
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
          <h1 className="text-3xl font-display font-bold text-foreground">Browse Events</h1>
          <p className="text-muted-foreground">Discover and register for upcoming events.</p>
        </div>
        <Button onClick={() => navigate("/create-event")} className="gap-2">
          <Plus className="w-4 h-4" />
          Create Event
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Event type" />
          </SelectTrigger>
          <SelectContent>
            {eventTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="rounded-xl border border-[hsl(270,65%,55%)]/30 bg-[hsl(270,65%,55%)]/10 backdrop-blur-xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">No Events Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            {searchQuery || typeFilter !== "All"
              ? "Try adjusting your filters to find more events."
              : "Be the first to create an event!"}
          </p>
          <Button onClick={() => navigate("/create-event")} className="gap-2">
            <Plus className="w-4 h-4" />
            Create Event
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              currentUserId={user.id}
              onRegister={handleRegister}
              onUnregister={handleUnregister}
              onDelete={handleDelete}
              isLoading={actionLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseEvents;
