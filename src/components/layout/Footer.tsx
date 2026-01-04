export const Footer = () => {
  return (
    <footer className="h-14 border-t border-border bg-card flex items-center justify-between px-6 text-sm text-muted-foreground">
      <p>© 2026 EventEase. All rights reserved.</p>
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
        <a href="#" className="hover:text-foreground transition-colors">Terms</a>
        <a href="#" className="hover:text-foreground transition-colors">Support</a>
      </div>
    </footer>
  );
};
