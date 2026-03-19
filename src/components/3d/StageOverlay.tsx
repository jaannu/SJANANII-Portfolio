import { motion, AnimatePresence } from "framer-motion";

const stages = [
  {
    id: "intro",
    label: "CNN Pipeline",
    desc: "Scroll to explore how Convolutional Neural Networks process visual data",
    detail: null,
  },
  {
    id: "input",
    label: "01 — Input Layer",
    desc: "Raw pixel intensities enter as a 2D grid",
    detail: "Each cell represents a pixel value (0–1). In color images, there are 3 channels (RGB). The network processes this spatial data to detect patterns.",
  },
  {
    id: "kernel",
    label: "02 — Convolution",
    desc: "Kernels slide across the input detecting features",
    detail: "A 3×3 kernel performs element-wise multiplication with the input patch, then sums the results. Different kernels detect edges, textures, and shapes. The stride controls how the kernel moves.",
  },
  {
    id: "feature",
    label: "03 — Feature Maps",
    desc: "Activated outputs reveal detected patterns",
    detail: "Each kernel produces one feature map. Edge kernels highlight boundaries, blur kernels smooth noise, and sharpen kernels enhance details. ReLU activation zeroes out negative values.",
  },
  {
    id: "pooling",
    label: "04 — Pooling",
    desc: "Dimensionality reduction preserves key features",
    detail: "Max pooling takes a 2×2 window and keeps only the maximum value. This reduces the spatial size by half, making the network invariant to small translations and reducing computation.",
  },
  {
    id: "output",
    label: "05 — Classification",
    desc: "Dense layers produce final predictions",
    detail: "Feature maps are flattened into a 1D vector, passed through fully connected layers with learned weights, and softmax activation produces probability distributions across classes.",
  },
];

interface StageOverlayProps {
  activeStage: number;
  selectedDetail: string | null;
  onClose: () => void;
}

const StageOverlay = ({ activeStage, selectedDetail, onClose }: StageOverlayProps) => {
  const stage = stages[activeStage];

  return (
    <>
      {/* Stage label */}
      <motion.div
        className="fixed top-8 left-8 z-20 pointer-events-none"
        key={stage.id}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-mono text-accent text-xs tracking-widest uppercase mb-2">
          {stage.label}
        </p>
        <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground max-w-md leading-tight">
          {stage.desc}
        </h2>
      </motion.div>

      {/* Progress indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3 items-center">
        {stages.map((s, i) => (
          <div
            key={s.id}
            className={`w-2 transition-all duration-300 rounded-full ${
              i === activeStage
                ? "h-8 bg-accent"
                : i < activeStage
                ? "h-2 bg-accent/50"
                : "h-2 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      {activeStage === 0 && (
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="font-mono text-muted-foreground text-xs">Scroll to explore</span>
          <div className="w-5 h-8 border-2 border-muted-foreground/40 rounded-full flex justify-center pt-1">
            <motion.div
              className="w-1 h-2 bg-accent rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      )}

      {/* Detail panel when clicked */}
      <AnimatePresence>
        {selectedDetail && (
          <motion.div
            className="fixed bottom-8 left-8 right-8 md:left-8 md:right-auto md:max-w-lg z-30 glass-card rounded-2xl p-6 cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            onClick={onClose}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-accent text-xs">
                Click to close
              </span>
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent text-xs">×</span>
              </div>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed font-sans">
              {stages.find((s) => s.id === selectedDetail)?.detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interaction hint */}
      {activeStage > 0 && !selectedDetail && (
        <motion.div
          className="fixed bottom-8 left-8 z-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="font-mono text-muted-foreground/60 text-xs">
            Click on 3D elements for details
          </span>
        </motion.div>
      )}
    </>
  );
};

export default StageOverlay;
