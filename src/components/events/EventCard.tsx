import { Calendar, MapPin, Users, IndianRupee, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Event } from "@/hooks/useEvents";

interface EventCardProps {
  event: Event;
  currentUserId: string;
  onRegister: (eventId: string) => void;
  onUnregister: (eventId: string) => void;
  onDelete?: (eventId: string) => void;
  isLoading?: boolean;
}

export const EventCard = ({
  event,
  currentUserId,
  onRegister,
  onUnregister,
  onDelete,
  isLoading,
}: EventCardProps) => {
  const isCreator = event.creator_id === currentUserId;
  const isPast = new Date(event.event_date) < new Date();

  return (
    <Card className="border border-[hsl(270,65%,55%)]/30 bg-[hsl(270,65%,55%)]/10 backdrop-blur-xl overflow-hidden hover:border-[hsl(270,65%,55%)]/50 transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 flex-1">
            <h3 className="font-semibold text-lg text-foreground line-clamp-1">{event.name}</h3>
            <Badge variant="secondary" className="text-xs">
              {event.type}
            </Badge>
          </div>
          {isCreator && onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(event.id)}
              disabled={isLoading}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-3">
        {event.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
        )}

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>{format(new Date(event.event_date), "PPP 'at' p")}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4 shrink-0" />
              <span>
                {event.registration_count || 0}
                {event.max_attendees ? ` / ${event.max_attendees}` : ""} registered
              </span>
            </div>
            {event.budget && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <IndianRupee className="w-4 h-4 shrink-0" />
                <span>₹{event.budget.toLocaleString('en-IN')}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t border-border/50">
        {isPast ? (
          <Badge variant="outline" className="text-muted-foreground">
            Event ended
          </Badge>
        ) : isCreator ? (
          <Badge variant="outline" className="text-primary">
            Your event
          </Badge>
        ) : event.is_registered ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUnregister(event.id)}
            disabled={isLoading}
            className="w-full"
          >
            Unregister
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={() => onRegister(event.id)}
            disabled={isLoading || (event.max_attendees ? (event.registration_count || 0) >= event.max_attendees : false)}
            className="w-full"
          >
            {event.max_attendees && (event.registration_count || 0) >= event.max_attendees
              ? "Event Full"
              : "Register"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
