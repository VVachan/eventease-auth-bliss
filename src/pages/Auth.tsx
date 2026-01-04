import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { AuthTabs } from "@/components/auth/AuthTabs";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { BrandingSection } from "@/components/auth/BrandingSection";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          navigate("/", { replace: true });
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side - Branding */}
      <div className="hidden lg:block lg:w-[55%] xl:w-[60%]">
        <div className="h-screen sticky top-0">
          <BrandingSection />
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col min-h-screen">
        {/* Mobile header with gradient background */}
        <div className="lg:hidden relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(234,89%,15%)] via-[hsl(262,83%,20%)] to-[hsl(280,70%,15%)]" />
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/20 rounded-full blur-[60px]" />
          </div>
          <div className="relative z-10 p-6 pb-8">
            <Logo size="md" variant="light" />
            <h2 className="mt-6 text-2xl font-display font-bold text-primary-foreground">
              Create unforgettable experiences
            </h2>
            <p className="mt-2 text-sm text-primary-foreground/70">
              The all-in-one event management platform
            </p>
          </div>
        </div>

        {/* Form section */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 xl:p-16">
          <div className="w-full max-w-[420px]">
            {/* Header */}
            <div className="text-center lg:text-left mb-8 animate-fade-in">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                {activeTab === "login" ? "Welcome back" : "Get started"}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {activeTab === "login"
                  ? "Sign in to continue to EventEase"
                  : "Create your free account today"}
              </p>
            </div>

            {/* Tabs */}
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            {/* Form */}
            <div 
              className="animate-fade-in" 
              key={activeTab}
              style={{ animationDelay: "0.15s" }}
            >
              {activeTab === "login" ? <LoginForm /> : <SignupForm />}
            </div>

            {/* Switch prompt */}
            <p className="mt-8 text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
              {activeTab === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setActiveTab("signup")}
                    className="text-primary font-semibold hover:underline underline-offset-4 transition-all"
                  >
                    Sign up for free
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setActiveTab("login")}
                    className="text-primary font-semibold hover:underline underline-offset-4 transition-all"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>

            {/* Terms */}
            <p className="mt-8 text-center text-xs text-muted-foreground/60 animate-fade-in" style={{ animationDelay: "0.25s" }}>
              By continuing, you agree to EventEase's{" "}
              <button className="underline hover:text-muted-foreground transition-colors">Terms of Service</button>
              {" "}and{" "}
              <button className="underline hover:text-muted-foreground transition-colors">Privacy Policy</button>
            </p>
          </div>
        </div>

        {/* Footer - minimal */}
        <div className="p-6 text-center text-xs text-muted-foreground/50">
          © 2026 EventEase. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Auth;
