import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const TerminalWindow = ({ title = "terminal", children, className }: TerminalWindowProps) => {
  return (
    <div className={cn("rounded-xl border border-border/40 overflow-hidden", className)}>
      {/* Title bar with dots */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-secondary/60 border-b border-border/30">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-crimson-bright/80" />
          <div className="w-3 h-3 rounded-full bg-crimson-medium/60" />
          <div className="w-3 h-3 rounded-full bg-crimson-dark/60" />
        </div>
        <span className="text-xs font-mono text-muted-foreground ml-2">{title}</span>
      </div>
      {/* Content */}
      <div className="bg-background/80 backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;
