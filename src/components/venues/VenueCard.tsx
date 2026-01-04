import { MapPin, Users, DollarSign, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Venue } from "@/hooks/useVenues";

interface VenueCardProps {
  venue: Venue;
  currentUserId: string;
  onDelete?: (venueId: string) => void;
  isLoading?: boolean;
}

export const VenueCard = ({ venue, currentUserId, onDelete, isLoading }: VenueCardProps) => {
  const { t } = useLanguage();
  const isCreator = venue.creator_id === currentUserId;

  return (
    <Card className="border border-[hsl(270,65%,55%)]/30 bg-[hsl(270,65%,55%)]/10 backdrop-blur-xl overflow-hidden hover:border-[hsl(270,65%,55%)]/50 transition-all duration-300 animate-fade-in group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🏛️
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground line-clamp-1">{venue.name}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span className="line-clamp-1">{venue.city}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={venue.is_available ? "default" : "secondary"} className="text-xs">
              {venue.is_available ? (
                <><Check className="w-3 h-3 mr-1" />{t("available")}</>
              ) : (
                <><X className="w-3 h-3 mr-1" />{t("unavailable")}</>
              )}
            </Badge>
            {isCreator && onDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onDelete(venue.id)}
                disabled={isLoading}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {venue.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{venue.description}</p>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="line-clamp-1">{venue.address}</span>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4 shrink-0" />
            <span>{venue.capacity} {t("guests")}</span>
          </div>
          {venue.price_per_hour && (
            <div className="flex items-center gap-1 text-accent">
              <DollarSign className="w-4 h-4 shrink-0" />
              <span>{venue.price_per_hour}/{t("perHour")}</span>
            </div>
          )}
        </div>

        {venue.amenities && venue.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {venue.amenities.slice(0, 3).map((amenity, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {venue.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{venue.amenities.length - 3}
              </Badge>
            )}
          </div>
        )}

        {isCreator && (
          <Badge variant="outline" className="text-primary text-xs">
            Your venue
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};
