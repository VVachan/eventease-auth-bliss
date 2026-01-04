import { Logo } from "@/components/Logo";
import { Calendar, Users, Sparkles, Zap } from "lucide-react";

const features = [
  { icon: Calendar, text: "Event scheduling" },
  { icon: Users, text: "Team collaboration" },
  { icon: Sparkles, text: "Smart tools" },
  { icon: Zap, text: "Fast setup" },
];

export const BrandingSection = () => {
  return (
    <div className="relative h-full overflow-hidden">
      {/* Ocean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(210,40%,12%)] via-[hsl(199,50%,18%)] to-[hsl(172,40%,15%)]" />
      
      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[hsl(199,89%,48%)]/15 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[hsl(172,66%,50%)]/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[hsl(199,89%,60%)]/10 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content - Centered and minimal */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 lg:p-12 xl:p-16 text-center">
        {/* Logo */}
        <div className="animate-fade-in mb-8">
          <Logo size="lg" variant="light" />
        </div>

        {/* Tagline */}
        <div className="space-y-4 animate-slide-up max-w-md" style={{ animationDelay: "0.2s" }}>
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-display font-bold leading-tight text-primary-foreground">
            Create
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(199,89%,55%)] to-[hsl(172,66%,55%)]"> unforgettable </span>
            experiences
          </h1>
          
          <p className="text-base text-primary-foreground/60">
            Plan, manage, and execute extraordinary events.
          </p>
        </div>

        {/* Mini features */}
        <div className="flex items-center gap-6 mt-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-primary-foreground/50"
            >
              <feature.icon className="w-4 h-4" />
              <span className="text-xs font-medium">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
