import { Search } from "lucide-react";

const BrowseEvents = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-display font-bold text-foreground">Browse Events</h1>
        <p className="text-muted-foreground">
          Discover and explore upcoming events.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-12 shadow-soft text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Search className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Event Browsing Coming Soon</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Browse and discover events in your area. This feature will be available soon!
        </p>
      </div>
    </div>
  );
};

export default BrowseEvents;
