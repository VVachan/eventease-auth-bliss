import { Logo } from "@/components/Logo";
import { Calendar, Users, Sparkles, Zap, Star } from "lucide-react";

const features = [
  { icon: Calendar, text: "Seamless event scheduling" },
  { icon: Users, text: "Team collaboration tools" },
  { icon: Sparkles, text: "Smart recommendations" },
  { icon: Zap, text: "Lightning-fast setup" },
];

export const BrandingSection = () => {
  return (
    <div className="relative h-full overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(234,89%,15%)] via-[hsl(262,83%,20%)] to-[hsl(280,70%,15%)]" />
      
      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/30 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[hsl(280,70%,50%)]/20 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-12 xl:p-16">
        {/* Logo */}
        <div className="animate-fade-in">
          <Logo size="lg" variant="light" />
        </div>

        {/* Main content */}
        <div className="space-y-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-sm font-medium text-primary-foreground/90">Trusted by 50,000+ organizers</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold leading-[1.1] text-primary-foreground">
              Create
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[hsl(30,90%,60%)] to-accent">
                unforgettable
              </span>
              <br />
              experiences
            </h1>
            
            <p className="text-lg lg:text-xl text-primary-foreground/70 max-w-lg leading-relaxed">
              The all-in-one platform to plan, manage, and execute extraordinary events that leave lasting impressions.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group flex items-center gap-3 p-4 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/10 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium text-primary-foreground/80">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="flex items-center gap-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-primary-foreground">1M+</p>
            <p className="text-xs text-primary-foreground/50 uppercase tracking-wider">Events Created</p>
          </div>
          <div className="w-px h-10 bg-primary-foreground/20" />
          <div className="space-y-1">
            <p className="text-2xl font-bold text-primary-foreground">150+</p>
            <p className="text-xs text-primary-foreground/50 uppercase tracking-wider">Countries</p>
          </div>
          <div className="w-px h-10 bg-primary-foreground/20" />
          <div className="space-y-1">
            <p className="text-2xl font-bold text-primary-foreground">99.9%</p>
            <p className="text-xs text-primary-foreground/50 uppercase tracking-wider">Uptime</p>
          </div>
        </div>
      </div>
    </div>
  );
};
