import { useNavigate, useOutletContext } from "react-router-dom";
import { CreateEventForm } from "@/components/events/CreateEventForm";
import { useEvents } from "@/hooks/useEvents";
import type { User } from "@supabase/supabase-js";

const CreateEvent = () => {
  const { user } = useOutletContext<{ user: User }>();
  const navigate = useNavigate();
  const { createEvent } = useEvents(user);

  const handleSuccess = () => {
    navigate("/browse-events");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-display font-bold text-foreground">Create Event</h1>
        <p className="text-muted-foreground">
          Fill in the details below to create your event.
        </p>
      </div>

      <div className="rounded-xl border border-[hsl(270,65%,55%)]/30 bg-[hsl(270,65%,55%)]/10 backdrop-blur-xl p-6 md:p-8">
        <CreateEventForm onSubmit={createEvent} onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default CreateEvent;
