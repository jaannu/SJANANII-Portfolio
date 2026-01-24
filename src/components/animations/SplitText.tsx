import { motion, useInView, Variants } from "framer-motion";
import { useRef, useMemo } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  splitBy?: "chars" | "words";
  threshold?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

const SplitText = ({
  text,
  className = "",
  delay = 50,
  splitBy = "chars",
  threshold = 0.1,
  as: Component = "p",
}: SplitTextProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const elements = useMemo(() => {
    return splitBy === "words" ? text.split(" ") : text.split("");
  }, [text, splitBy]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const MotionComponent = motion[Component] as any;

  return (
    <MotionComponent
      ref={ref}
      className={`flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {elements.map((element, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          className="inline-block"
          style={{ 
            marginRight: splitBy === "words" ? "0.25em" : "0",
            whiteSpace: element === " " ? "pre" : "normal"
          }}
        >
          {element === " " ? "\u00A0" : element}
        </motion.span>
      ))}
    </MotionComponent>
  );
};

export default SplitText;
