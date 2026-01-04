import { Logo } from "@/components/Logo";
import { Calendar, Users, Sparkles, Check } from "lucide-react";

const features = [
  { icon: Calendar, text: "Seamless event scheduling" },
  { icon: Users, text: "Team collaboration tools" },
  { icon: Sparkles, text: "Smart recommendations" },
];

export const BrandingSection = () => {
  return (
    <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-brand text-primary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Logo size="lg" variant="light" />
      </div>

      <div className="relative z-10 space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl xl:text-5xl font-display font-bold leading-tight">
            Create memorable
            <br />
            <span className="text-accent">events</span> effortlessly
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-md leading-relaxed">
            Plan, organize, and manage your events with our intuitive platform. From intimate gatherings to large conferences.
          </p>
        </div>

        <div className="space-y-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-primary-foreground/90 font-medium">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <p className="text-sm text-primary-foreground/60">
          Trusted by 10,000+ event organizers worldwide
        </p>
      </div>
    </div>
  );
};
