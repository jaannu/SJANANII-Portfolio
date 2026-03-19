import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import CNNScene from "@/components/3d/CNNScene";
import StageOverlay from "@/components/3d/StageOverlay";

const TOTAL_STAGES = 6;

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScrollProgress((prev) => {
        const next = prev + e.deltaY * 0.0005;
        return Math.max(0, Math.min(1, next));
      });
    };

    const handleTouch = (() => {
      let lastY = 0;
      return {
        start: (e: TouchEvent) => { lastY = e.touches[0].clientY; },
        move: (e: TouchEvent) => {
          e.preventDefault();
          const deltaY = lastY - e.touches[0].clientY;
          lastY = e.touches[0].clientY;
          setScrollProgress((prev) => {
            const next = prev + deltaY * 0.002;
            return Math.max(0, Math.min(1, next));
          });
        },
      };
    })();

    const el = containerRef.current;
    if (el) {
      el.addEventListener("wheel", handleWheel, { passive: false });
      el.addEventListener("touchstart", handleTouch.start, { passive: true });
      el.addEventListener("touchmove", handleTouch.move, { passive: false });
      return () => {
        el.removeEventListener("wheel", handleWheel);
        el.removeEventListener("touchstart", handleTouch.start);
        el.removeEventListener("touchmove", handleTouch.move);
      };
    }
  }, []);

  // Map scroll progress to active stage
  useEffect(() => {
    const stage = Math.min(
      TOTAL_STAGES - 1,
      Math.floor(scrollProgress * TOTAL_STAGES)
    );
    setActiveStage(stage);
  }, [scrollProgress]);

  const handleStageClick = useCallback((stage: string) => {
    setSelectedDetail((prev) => (prev === stage ? null : stage));
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-background overflow-hidden cursor-default"
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <CNNScene
          scrollProgress={scrollProgress}
          activeStage={activeStage}
          onStageClick={handleStageClick}
        />
      </div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-background/30 via-transparent to-background/50" />

      {/* UI Overlay */}
      <StageOverlay
        activeStage={activeStage}
        selectedDetail={selectedDetail}
        onClose={() => setSelectedDetail(null)}
      />

      {/* Bottom nav bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-20 h-1 bg-muted"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
      >
        <div
          className="h-full bg-accent origin-left transition-transform duration-100"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </motion.div>

      {/* S Jananii branding */}
      <div className="fixed top-8 right-8 z-20">
        <span className="font-mono text-muted-foreground text-xs">
          S Jananii — ML Portfolio
        </span>
      </div>
    </div>
  );
};

export default Index;
