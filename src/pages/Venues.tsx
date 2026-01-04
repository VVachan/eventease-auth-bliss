import { useState } from "react";
import { MapPin, Plus, Search, Loader2 } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VenueCard } from "@/components/venues/VenueCard";
import { AddVenueDialog } from "@/components/venues/AddVenueDialog";
import { useVenues } from "@/hooks/useVenues";
import { useLanguage } from "@/contexts/LanguageContext";
import type { User } from "@supabase/supabase-js";

const Venues = () => {
  const { user } = useOutletContext<{ user: User }>();
  const { t } = useLanguage();
  const { venues, loading, error, createVenue, deleteVenue } = useVenues(user);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const filteredVenues = venues.filter((venue) => {
    return (
      venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleDelete = async (venueId: string) => {
    setActionLoading(true);
    await deleteVenue(venueId);
    setActionLoading(false);
  };

  if (error) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-8 text-center">
          <p className="text-destructive">{t("error")}: {error}</p>
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
          <h1 className="text-3xl font-display font-bold text-foreground">{t("venues")}</h1>
          <p className="text-muted-foreground">Find and book the perfect venue for your events.</p>
        </div>
        <AddVenueDialog
          onSubmit={createVenue}
          trigger={
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              {t("addVenue")}
            </Button>
          }
        />
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={`${t("search")} venues...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Venues Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : filteredVenues.length === 0 ? (
        <div className="rounded-xl border border-[hsl(270,65%,55%)]/30 bg-[hsl(270,65%,55%)]/10 backdrop-blur-xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">{t("noVenues")}</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">{t("noVenuesDesc")}</p>
          <AddVenueDialog
            onSubmit={createVenue}
            trigger={
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                {t("addVenue")}
              </Button>
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVenues.map((venue) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              currentUserId={user.id}
              onDelete={handleDelete}
              isLoading={actionLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Venues;
