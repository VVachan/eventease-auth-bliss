import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

export interface Event {
  id: string;
  creator_id: string;
  name: string;
  type: string;
  description: string | null;
  event_date: string;
  location: string;
  budget: number | null;
  max_attendees: number | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  registration_count?: number;
  is_registered?: boolean;
}

export interface CreateEventData {
  name: string;
  type: string;
  description?: string;
  event_date: string;
  location: string;
  budget?: number;
  max_attendees?: number;
}

export const useEvents = (user: User | null) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchEvents = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);

      // Fetch all events
      const { data: eventsData, error: eventsError } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });

      if (eventsError) throw eventsError;

      // Fetch registration counts
      const { data: registrations, error: regError } = await supabase
        .from("event_registrations")
        .select("event_id, user_id");

      if (regError) throw regError;

      // Process events with registration data
      const processedEvents = (eventsData || []).map((event) => {
        const eventRegs = registrations?.filter((r) => r.event_id === event.id) || [];
        return {
          ...event,
          registration_count: eventRegs.length,
          is_registered: eventRegs.some((r) => r.user_id === user.id),
        };
      });

      setEvents(processedEvents);
      setMyEvents(processedEvents.filter((e) => e.creator_id === user.id));
      setRegisteredEvents(processedEvents.filter((e) => e.is_registered));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch events";
      setError(message);
      toast({ variant: "destructive", title: "Error", description: message });
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (data: CreateEventData) => {
    if (!user) return null;

    try {
      const { data: newEvent, error } = await supabase
        .from("events")
        .insert({
          ...data,
          creator_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      toast({ title: "Success", description: "Event created successfully!" });
      await fetchEvents();
      return newEvent;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create event";
      toast({ variant: "destructive", title: "Error", description: message });
      return null;
    }
  };

  const registerForEvent = async (eventId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from("event_registrations")
        .insert({ event_id: eventId, user_id: user.id });

      if (error) throw error;

      toast({ title: "Success", description: "Registered for event!" });
      await fetchEvents();
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to register";
      toast({ variant: "destructive", title: "Error", description: message });
      return false;
    }
  };

  const unregisterFromEvent = async (eventId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from("event_registrations")
        .delete()
        .eq("event_id", eventId)
        .eq("user_id", user.id);

      if (error) throw error;

      toast({ title: "Success", description: "Unregistered from event" });
      await fetchEvents();
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to unregister";
      toast({ variant: "destructive", title: "Error", description: message });
      return false;
    }
  };

  const deleteEvent = async (eventId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventId)
        .eq("creator_id", user.id);

      if (error) throw error;

      toast({ title: "Success", description: "Event deleted" });
      await fetchEvents();
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete event";
      toast({ variant: "destructive", title: "Error", description: message });
      return false;
    }
  };

  // Initial fetch
  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user]);

  // Real-time subscriptions
  useEffect(() => {
    if (!user) return;

    const eventsChannel = supabase
      .channel("events-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "events" },
        () => fetchEvents()
      )
      .subscribe();

    const registrationsChannel = supabase
      .channel("registrations-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "event_registrations" },
        () => fetchEvents()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(eventsChannel);
      supabase.removeChannel(registrationsChannel);
    };
  }, [user]);

  return {
    events,
    myEvents,
    registeredEvents,
    loading,
    error,
    createEvent,
    registerForEvent,
    unregisterFromEvent,
    deleteEvent,
    refetch: fetchEvents,
  };
};
