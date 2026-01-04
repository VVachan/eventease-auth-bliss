import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

export interface Venue {
  id: string;
  creator_id: string;
  name: string;
  address: string;
  city: string;
  capacity: number;
  price_per_hour: number | null;
  description: string | null;
  amenities: string[] | null;
  image_url: string | null;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateVenueData {
  name: string;
  address: string;
  city: string;
  capacity: number;
  price_per_hour?: number;
  description?: string;
  amenities?: string[];
  is_available?: boolean;
}

export const useVenues = (user: User | null) => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [myVenues, setMyVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchVenues = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("venues")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      const venuesData = (data || []) as Venue[];
      setVenues(venuesData);
      setMyVenues(venuesData.filter((v) => v.creator_id === user.id));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch venues";
      setError(message);
      toast({ variant: "destructive", title: "Error", description: message });
    } finally {
      setLoading(false);
    }
  };

  const createVenue = async (data: CreateVenueData) => {
    if (!user) return null;

    try {
      const { data: newVenue, error } = await supabase
        .from("venues")
        .insert({ ...data, creator_id: user.id })
        .select()
        .single();

      if (error) throw error;

      toast({ title: "Success", description: "Venue added successfully!" });
      await fetchVenues();
      return newVenue;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create venue";
      toast({ variant: "destructive", title: "Error", description: message });
      return null;
    }
  };

  const deleteVenue = async (venueId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from("venues")
        .delete()
        .eq("id", venueId)
        .eq("creator_id", user.id);

      if (error) throw error;

      toast({ title: "Success", description: "Venue deleted" });
      await fetchVenues();
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete venue";
      toast({ variant: "destructive", title: "Error", description: message });
      return false;
    }
  };

  useEffect(() => {
    if (user) fetchVenues();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("venues-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "venues" }, () => fetchVenues())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return { venues, myVenues, loading, error, createVenue, deleteVenue, refetch: fetchVenues };
};
