import { Bell, Check, Trash2, Loader2, Info, AlertCircle, CheckCircle2 } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/useNotifications";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import type { User } from "@supabase/supabase-js";

const typeIcons: Record<string, React.ReactNode> = {
  info: <Info className="w-5 h-5 text-primary" />,
  success: <CheckCircle2 className="w-5 h-5 text-green-500" />,
  warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
  error: <AlertCircle className="w-5 h-5 text-destructive" />,
};

const Notifications = () => {
  const { user } = useOutletContext<{ user: User }>();
  const { t } = useLanguage();
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead, deleteNotification } = useNotifications(user);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-display font-bold text-foreground">{t("notifications")}</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : "Stay updated with your event notifications."}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead} className="gap-2">
            <Check className="w-4 h-4" />
            {t("markAllRead")}
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="rounded-xl border border-[hsl(270,65%,55%)]/30 bg-[hsl(270,65%,55%)]/10 backdrop-blur-xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Bell className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">{t("noNotifications")}</h2>
          <p className="text-muted-foreground max-w-md mx-auto">{t("noNotificationsDesc")}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "rounded-xl border bg-[hsl(270,65%,55%)]/10 backdrop-blur-xl p-4 transition-all duration-200 group",
                notification.is_read
                  ? "border-border/50 opacity-70"
                  : "border-[hsl(270,65%,55%)]/30 hover:border-[hsl(270,65%,55%)]/50"
              )}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center shrink-0">
                  {typeIcons[notification.type] || typeIcons.info}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{notification.title}</h3>
                    {!notification.is_read && (
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground/70 mt-2">
                    {format(new Date(notification.created_at), "PPp")}
                  </p>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!notification.is_read && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
