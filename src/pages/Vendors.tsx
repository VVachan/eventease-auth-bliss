import { Store } from "lucide-react";

const Vendors = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-display font-bold text-foreground">Vendors</h1>
        <p className="text-muted-foreground">
          Manage your vendor partnerships and services.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-12 shadow-soft text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Store className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Vendor Management Coming Soon</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Connect with vendors for catering, photography, entertainment and more!
        </p>
      </div>
    </div>
  );
};

export default Vendors;
