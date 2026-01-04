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
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          navigate("/", { replace: true });
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:block lg:w-1/2 xl:w-[55%]">
        <BrandingSection />
      </div>

      {/* Right side - Auth forms */}
      <div className="w-full lg:w-1/2 xl:w-[45%] flex flex-col">
        {/* Mobile header */}
        <div className="lg:hidden p-6 border-b border-border">
          <Logo size="md" />
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
          <div className="w-full max-w-md animate-slide-up">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                {activeTab === "login" ? "Welcome back" : "Get started"}
              </h2>
              <p className="mt-2 text-muted-foreground">
                {activeTab === "login"
                  ? "Sign in to continue to EventEase"
                  : "Create your EventEase account"}
              </p>
            </div>

            <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="animate-fade-in" key={activeTab}>
              {activeTab === "login" ? <LoginForm /> : <SignupForm />}
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              {activeTab === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setActiveTab("signup")}
                    className="text-primary font-medium hover:underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setActiveTab("login")}
                    className="text-primary font-medium hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 text-center text-sm text-muted-foreground border-t border-border">
          © 2024 EventEase. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Auth;
