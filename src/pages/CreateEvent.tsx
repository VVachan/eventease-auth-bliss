import { PlusCircle } from "lucide-react";

const CreateEvent = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-display font-bold text-foreground">Create Event</h1>
        <p className="text-muted-foreground">
          Create and manage your events with ease.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-12 shadow-soft text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <PlusCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Event Creation Coming Soon</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The event creation feature will be available in the next phase. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default CreateEvent;
