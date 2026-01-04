import { Ticket } from "lucide-react";

const Registrations = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-display font-bold text-foreground">My Registrations</h1>
        <p className="text-muted-foreground">
          View and manage your event registrations.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-12 shadow-soft text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Ticket className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">No Registrations Yet</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          You haven't registered for any events yet. Browse events to find something interesting!
        </p>
      </div>
    </div>
  );
};

export default Registrations;
