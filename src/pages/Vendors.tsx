import { useState } from "react";
import { Store, Plus, Search, Loader2 } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VendorCard } from "@/components/vendors/VendorCard";
import { AddVendorDialog } from "@/components/vendors/AddVendorDialog";
import { useVendors, VendorType } from "@/hooks/useVendors";
import { useLanguage } from "@/contexts/LanguageContext";
import type { User } from "@supabase/supabase-js";

const vendorTypeOptions: { value: string; labelKey: string }[] = [
  { value: "all", labelKey: "all" },
  { value: "caterer", labelKey: "caterer" },
  { value: "decorator", labelKey: "decorator" },
  { value: "photographer", labelKey: "photographer" },
  { value: "musician", labelKey: "musician" },
  { value: "florist", labelKey: "florist" },
  { value: "planner", labelKey: "planner" },
  { value: "other", labelKey: "other" },
];

const Vendors = () => {
  const { user } = useOutletContext<{ user: User }>();
  const { t } = useLanguage();
  const { vendors, loading, error, createVendor, deleteVendor } = useVendors(user);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState(false);

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || vendor.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleDelete = async (vendorId: string) => {
    setActionLoading(true);
    await deleteVendor(vendorId);
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
          <h1 className="text-3xl font-display font-bold text-foreground">{t("vendors")}</h1>
          <p className="text-muted-foreground">Manage your vendor partnerships and services.</p>
        </div>
        <AddVendorDialog
          onSubmit={createVendor}
          trigger={
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              {t("addVendor")}
            </Button>
          }
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={`${t("search")}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {vendorTypeOptions.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {t(type.labelKey as any)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Vendors Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : filteredVendors.length === 0 ? (
        <div className="rounded-xl border border-[hsl(270,65%,55%)]/30 bg-[hsl(270,65%,55%)]/10 backdrop-blur-xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Store className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">{t("noVendors")}</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">{t("noVendorsDesc")}</p>
          <AddVendorDialog
            onSubmit={createVendor}
            trigger={
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                {t("addVendor")}
              </Button>
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
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

export default Vendors;
