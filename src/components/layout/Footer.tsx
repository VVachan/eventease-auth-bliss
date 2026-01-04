import { Phone, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="h-auto min-h-14 border-t border-border bg-card/50 flex flex-col sm:flex-row items-center justify-between px-6 py-3 gap-3 text-sm text-muted-foreground">
      <p>© 2026 EventEase. All rights reserved.</p>
      <div className="flex items-center gap-4">
        <a href="tel:+1800123456" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
          <Phone className="w-3.5 h-3.5" />
          <span>1-800-123-456</span>
        </a>
        <a href="mailto:support@eventease.com" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
          <Mail className="w-3.5 h-3.5" />
          <span>support@eventease.com</span>
        </a>
      </div>
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
        <a href="#" className="hover:text-foreground transition-colors">Terms</a>
        <a href="#" className="hover:text-foreground transition-colors">Support</a>
      </div>
    </footer>
  );
};
