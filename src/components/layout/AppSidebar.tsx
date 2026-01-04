import {
  LayoutDashboard,
  PlusCircle,
  Search,
  Ticket,
  Store,
  MapPin,
  CalendarDays,
  Bell,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { TranslationKey } from "@/lib/translations";

const mainMenuItems: { titleKey: TranslationKey; url: string; icon: any }[] = [
  { titleKey: "dashboard", url: "/", icon: LayoutDashboard },
  { titleKey: "createEvent", url: "/create-event", icon: PlusCircle },
  { titleKey: "browseEvents", url: "/browse-events", icon: Search },
  { titleKey: "myRegistrations", url: "/registrations", icon: Ticket },
];

const manageMenuItems: { titleKey: TranslationKey; url: string; icon: any }[] = [
  { titleKey: "vendors", url: "/vendors", icon: Store },
  { titleKey: "venues", url: "/venues", icon: MapPin },
];

const otherMenuItems: { titleKey: TranslationKey; url: string; icon: any }[] = [
  { titleKey: "calendar", url: "/calendar", icon: CalendarDays },
  { titleKey: "notifications", url: "/notifications", icon: Bell },
  { titleKey: "settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { setOpen, setOpenMobile, isMobile } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  const handleClose = () => {
    if (isMobile) {
      setOpenMobile(false);
    } else {
      setOpen(false);
    }
  };

  const handleNavigate = (url: string) => {
    navigate(url);
    handleClose();
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate("/auth");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again.",
      });
    }
  };

  const MenuItem = ({ item }: { item: { titleKey: TranslationKey; url: string; icon: any } }) => (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive(item.url)}>
        <button
          onClick={() => handleNavigate(item.url)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
            isActive(item.url)
              ? "bg-primary text-primary-foreground shadow-soft"
              : "hover:bg-secondary text-foreground"
          )}
        >
          <item.icon className="w-5 h-5 shrink-0" />
          <span className="font-medium">{t(item.titleKey)}</span>
        </button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-border bg-sidebar">
      <SidebarHeader className="p-4 flex flex-row items-center justify-between">
        <Logo size="md" />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </Button>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {t("main")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainMenuItems.map((item) => (
                <MenuItem key={item.titleKey} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {t("manage")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {manageMenuItems.map((item) => (
                <MenuItem key={item.titleKey} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {t("other")}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {otherMenuItems.map((item) => (
                <MenuItem key={item.titleKey} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-destructive hover:bg-destructive/10 transition-all duration-200"
            >
              <LogOut className="w-5 h-5 shrink-0" />
              <span className="font-medium">{t("logout")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
