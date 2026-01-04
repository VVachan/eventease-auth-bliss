import { MapPin } from "lucide-react";

const Venues = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-display font-bold text-foreground">Venues</h1>
        <p className="text-muted-foreground">
          Find and book the perfect venue for your events.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-12 shadow-soft text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Venue Booking Coming Soon</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Explore venues, check availability, and book spaces for your events.
        </p>
      </div>
    </div>
  );
};

export default Venues;
