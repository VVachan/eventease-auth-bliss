import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

export type VendorType = "caterer" | "decorator" | "photographer" | "musician" | "florist" | "planner" | "other";

export interface Vendor {
  id: string;
  creator_id: string;
  name: string;
  type: VendorType;
  description: string | null;
  email: string | null;
  phone: string | null;
  price_range: string | null;
  rating: number | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateVendorData {
  name: string;
  type: VendorType;
  description?: string;
  email?: string;
  phone?: string;
  price_range?: string;
}

export const useVendors = (user: User | null) => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [myVendors, setMyVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchVendors = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("vendors")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      const vendorsData = (data || []) as Vendor[];
      setVendors(vendorsData);
      setMyVendors(vendorsData.filter((v) => v.creator_id === user.id));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch vendors";
      setError(message);
      toast({ variant: "destructive", title: "Error", description: message });
    } finally {
      setLoading(false);
    }
  };

  const createVendor = async (data: CreateVendorData) => {
    if (!user) return null;

    try {
      const { data: newVendor, error } = await supabase
        .from("vendors")
        .insert({ ...data, creator_id: user.id })
        .select()
        .single();

      if (error) throw error;

      toast({ title: "Success", description: "Vendor added successfully!" });
      await fetchVendors();
      return newVendor;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create vendor";
      toast({ variant: "destructive", title: "Error", description: message });
      return null;
    }
  };

  const deleteVendor = async (vendorId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from("vendors")
        .delete()
        .eq("id", vendorId)
        .eq("creator_id", user.id);

      if (error) throw error;

      toast({ title: "Success", description: "Vendor deleted" });
      await fetchVendors();
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete vendor";
      toast({ variant: "destructive", title: "Error", description: message });
      return false;
    }
  };

  useEffect(() => {
    if (user) fetchVendors();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("vendors-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "vendors" }, () => fetchVendors())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return { vendors, myVendors, loading, error, createVendor, deleteVendor, refetch: fetchVendors };
};
