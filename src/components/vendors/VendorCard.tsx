import { Mail, Phone, DollarSign, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Vendor } from "@/hooks/useVendors";

const vendorTypeIcons: Record<string, string> = {
  caterer: "🍽️",
  decorator: "🎨",
  photographer: "📸",
  musician: "🎵",
  florist: "💐",
  planner: "📋",
  other: "✨",
};

interface VendorCardProps {
  vendor: Vendor;
  currentUserId: string;
  onDelete?: (vendorId: string) => void;
  isLoading?: boolean;
}

export const VendorCard = ({ vendor, currentUserId, onDelete, isLoading }: VendorCardProps) => {
  const { t } = useLanguage();
  const isCreator = vendor.creator_id === currentUserId;

  return (
    <Card className="border border-[hsl(270,65%,55%)]/30 bg-[hsl(270,65%,55%)]/10 backdrop-blur-xl overflow-hidden hover:border-[hsl(270,65%,55%)]/50 transition-all duration-300 animate-fade-in group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              {vendorTypeIcons[vendor.type] || "✨"}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground line-clamp-1">{vendor.name}</h3>
              <Badge variant="secondary" className="text-xs capitalize">
                {t(vendor.type as any) || vendor.type}
              </Badge>
            </div>
          </div>
          {isCreator && onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onDelete(vendor.id)}
              disabled={isLoading}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {vendor.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{vendor.description}</p>
        )}

        <div className="space-y-2 text-sm">
          {vendor.email && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4 shrink-0" />
              <a href={`mailto:${vendor.email}`} className="hover:text-primary transition-colors truncate">
                {vendor.email}
              </a>
            </div>
          )}
          {vendor.phone && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4 shrink-0" />
              <a href={`tel:${vendor.phone}`} className="hover:text-primary transition-colors">
                {vendor.phone}
              </a>
            </div>
          )}
          <div className="flex items-center gap-4">
            {vendor.price_range && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <DollarSign className="w-4 h-4 shrink-0" />
                <span>{vendor.price_range}</span>
              </div>
            )}
            {vendor.rating && (
              <div className="flex items-center gap-1 text-accent">
                <Star className="w-4 h-4 fill-current" />
                <span>{vendor.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>

        {isCreator && (
          <Badge variant="outline" className="text-primary text-xs">
            Your vendor
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};
