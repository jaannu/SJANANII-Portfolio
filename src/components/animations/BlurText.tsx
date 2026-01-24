import { motion, useInView, Variants } from "framer-motion";
import { useRef, useMemo } from "react";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
}

const BlurText = ({
  text,
  className = "",
  delay = 100,
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
}: BlurTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const elements = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: direction === "top" ? -20 : 20,
    },
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        delay: i * (delay / 1000),
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {elements.map((element, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="inline-block"
          style={{ marginRight: animateBy === "words" ? "0.3em" : "0" }}
        >
          {element}
        </motion.span>
      ))}
    </p>
  );
};

export default BlurText;
