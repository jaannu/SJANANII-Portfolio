import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  from?: string;
  to?: string;
  animate?: boolean;
}

const GradientText = ({
  children,
  className = "",
  from = "hsl(0 20% 95%)",
  to = "hsl(355 70% 55%)",
  animate = false,
}: GradientTextProps) => {
  return (
    <span
      className={`bg-clip-text text-transparent ${animate ? "animate-shimmer" : ""} ${className}`}
      style={{
        backgroundImage: `linear-gradient(135deg, ${from} 0%, ${to} 50%, ${from} 100%)`,
        backgroundSize: animate ? "200% auto" : "100% auto",
      }}
    >
      {children}
    </span>
  );
};

export default GradientText;
