import { useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import InputGrid from "./InputGrid";
import KernelGrid from "./KernelGrid";
import FeatureMap from "./FeatureMap";
import ConvolutionArrows from "./ConvolutionArrows";
import PoolingLayer from "./PoolingLayer";
import OutputNeurons from "./OutputNeurons";

// Stage positions along the Z axis (camera moves through)
const stages = [
  { id: "intro", z: 0, label: "Welcome", desc: "Scroll to explore how Convolutional Neural Networks see the world" },
  { id: "input", z: -8, label: "Input Layer", desc: "Raw pixel data enters the network as a grid of intensity values" },
  { id: "kernel", z: -16, label: "Convolution", desc: "Kernels slide across the input, detecting patterns through element-wise multiplication" },
  { id: "feature", z: -26, label: "Feature Maps", desc: "Each kernel produces a feature map highlighting detected patterns" },
  { id: "pooling", z: -34, label: "Pooling", desc: "Max pooling reduces spatial dimensions, keeping the strongest activations" },
  { id: "output", z: -42, label: "Output", desc: "Flattened features feed into dense layers for final classification" },
];

interface CameraControllerProps {
  scrollProgress: number;
}

const CameraController = ({ scrollProgress }: CameraControllerProps) => {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 5));

  useFrame(() => {
    // Map scroll progress to camera Z position
    const totalZ = stages[stages.length - 1].z;
    const targetZ = 5 + scrollProgress * totalZ;
    targetPos.current.set(0, 0, targetZ);
    camera.position.lerp(targetPos.current, 0.05);
  });

  return null;
};

// Floating particles in the scene
const Particles = () => {
  const ref = useRef<THREE.Group>(null);
  const particles = Array.from({ length: 80 }, (_, i) => ({
    pos: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10,
      (Math.random() * -50),
    ] as [number, number, number],
    size: Math.random() * 0.04 + 0.01,
    speed: Math.random() * 0.5 + 0.2,
  }));

  useFrame((state) => {
    if (ref.current) {
      ref.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        mesh.position.y += Math.sin(state.clock.elapsedTime * particles[i].speed + i) * 0.002;
      });
    }
  });

  return (
    <group ref={ref}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <sphereGeometry args={[p.size, 6, 6]} />
          <meshStandardMaterial
            color="hsl(355, 70%, 43%)"
            emissive="hsl(355, 70%, 43%)"
            emissiveIntensity={0.5}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
};

// Animated convolution indicator
const ConvolutionIndicator = () => {
  const [highlightPos, setHighlightPos] = useState<[number, number]>([1, 1]);

  useEffect(() => {
    const positions: [number, number][] = [];
    for (let r = 1; r <= 5; r++) {
      for (let c = 1; c <= 5; c++) {
        positions.push([r, c]);
      }
    }
    let idx = 0;
    const interval = setInterval(() => {
      setHighlightPos(positions[idx % positions.length]);
      idx++;
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return highlightPos;
};

interface SceneContentProps {
  scrollProgress: number;
  activeStage: number;
  onStageClick: (stage: string) => void;
}

const SceneContent = ({ scrollProgress, activeStage, onStageClick }: SceneContentProps) => {
  const highlightPos = ConvolutionIndicator();

  return (
    <>
      <CameraController scrollProgress={scrollProgress} />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="hsl(355, 70%, 60%)" />
      <pointLight position={[-5, -3, -20]} intensity={0.8} color="hsl(355, 80%, 45%)" />
      <pointLight position={[0, 0, -40]} intensity={0.6} color="hsl(355, 70%, 50%)" />

      <Particles />

      {/* Stage 0: Intro */}
      <group position={[0, 0, 0]}>
        <Float speed={2} floatIntensity={0.5}>
          <Text
            font="/fonts/Inter-Bold.woff"
            fontSize={0.8}
            color="hsl(355, 70%, 55%)"
            position={[0, 1, 0]}
            anchorX="center"
            anchorY="middle"
          >
            CNN
          </Text>
        </Float>
        <Text
          font="/fonts/Inter-Bold.woff"
          fontSize={0.15}
          color="hsl(0, 20%, 65%)"
          position={[0, -0.2, 0]}
          anchorX="center"
          anchorY="middle"
          maxWidth={5}
          textAlign="center"
        >
          Convolutional Neural Network
        </Text>
        <Text
          font="/fonts/Inter-Bold.woff"
          fontSize={0.1}
          color="hsl(0, 20%, 45%)"
          position={[0, -0.8, 0]}
          anchorX="center"
          anchorY="middle"
        >
          ↓ SCROLL TO EXPLORE ↓
        </Text>
      </group>

      {/* Stage 1: Input Grid */}
      <group position={[0, 0, stages[1].z]}>
        <InputGrid
          position={[0, 0, 0]}
          highlight={activeStage >= 2 ? highlightPos : null}
          active={true}
          onClick={() => onStageClick("input")}
        />
      </group>

      {/* Arrow: Input → Kernel */}
      <ConvolutionArrows
        from={[0, 0, stages[1].z - 1.5]}
        to={[0, 0, stages[2].z + 2]}
        active={activeStage >= 1}
      />

      {/* Stage 2: Kernel / Convolution */}
      <group position={[0, 0, stages[2].z]}>
        <Float speed={1.5} floatIntensity={0.3}>
          <KernelGrid
            position={[-2.5, 1, 0]}
            kernelType="edge"
            onClick={() => onStageClick("kernel")}
          />
        </Float>
        <Float speed={1.8} floatIntensity={0.3}>
          <KernelGrid
            position={[0, -0.5, 0]}
            kernelType="sharpen"
            onClick={() => onStageClick("kernel")}
          />
        </Float>
        <Float speed={1.2} floatIntensity={0.3}>
          <KernelGrid
            position={[2.5, 1, 0]}
            kernelType="blur"
            onClick={() => onStageClick("kernel")}
          />
        </Float>

        {/* Small labels */}
        <Text font="/fonts/Inter-Bold.woff" fontSize={0.1} color="hsl(355, 70%, 55%)" position={[-2.5, -0.5, 0]} anchorX="center">
          Edge Detect
        </Text>
        <Text font="/fonts/Inter-Bold.woff" fontSize={0.1} color="hsl(355, 70%, 55%)" position={[0, -2, 0]} anchorX="center">
          Sharpen
        </Text>
        <Text font="/fonts/Inter-Bold.woff" fontSize={0.1} color="hsl(355, 70%, 55%)" position={[2.5, -0.5, 0]} anchorX="center">
          Blur
        </Text>
      </group>

      {/* Arrows: Kernel → Feature Maps */}
      <ConvolutionArrows
        from={[0, 0, stages[2].z - 2]}
        to={[0, 0, stages[3].z + 3]}
        active={activeStage >= 2}
      />

      {/* Stage 3: Feature Maps */}
      <group position={[0, 0, stages[3].z]}>
        <FeatureMap position={[-2.8, 0, 0]} mapIndex={0} onClick={() => onStageClick("feature")} />
        <FeatureMap position={[0, 0, 0]} mapIndex={1} onClick={() => onStageClick("feature")} />
        <FeatureMap position={[2.8, 0, 0]} mapIndex={2} onClick={() => onStageClick("feature")} />

        <Text font="/fonts/Inter-Bold.woff" fontSize={0.1} color="hsl(355, 70%, 55%)" position={[-2.8, -1.5, 0]} anchorX="center">
          Edge Features
        </Text>
        <Text font="/fonts/Inter-Bold.woff" fontSize={0.1} color="hsl(355, 70%, 55%)" position={[0, -1.5, 0]} anchorX="center">
          Blur Features
        </Text>
        <Text font="/fonts/Inter-Bold.woff" fontSize={0.1} color="hsl(355, 70%, 55%)" position={[2.8, -1.5, 0]} anchorX="center">
          Sharp Features
        </Text>
      </group>

      {/* Arrows: Feature Maps → Pooling */}
      <ConvolutionArrows
        from={[0, 0, stages[3].z - 2]}
        to={[0, 0, stages[4].z + 2]}
        active={activeStage >= 3}
      />

      {/* Stage 4: Pooling */}
      <group position={[0, 0, stages[4].z]}>
        <PoolingLayer position={[0, 0, 0]} onClick={() => onStageClick("pooling")} />
      </group>

      {/* Arrows: Pooling → Output */}
      <ConvolutionArrows
        from={[0, 0, stages[4].z - 1.5]}
        to={[0, 0, stages[5].z + 2]}
        active={activeStage >= 4}
      />

      {/* Stage 5: Output */}
      <group position={[0, 0, stages[5].z]}>
        <OutputNeurons position={[0, 0, 0]} onClick={() => onStageClick("output")} />

        <Text font="/fonts/Inter-Bold.woff" fontSize={0.12} color="hsl(0, 20%, 80%)" position={[1.2, 1.2, 0]} anchorX="left">
          Cat: 92%
        </Text>
        <Text font="/fonts/Inter-Bold.woff" fontSize={0.09} color="hsl(0, 20%, 50%)" position={[0.8, 0.4, 0]} anchorX="left">
          Dog: 5%
        </Text>
        <Text font="/fonts/Inter-Bold.woff" fontSize={0.09} color="hsl(0, 20%, 40%)" position={[0.6, -0.4, 0]} anchorX="left">
          Bird: 2%
        </Text>
        <Text font="/fonts/Inter-Bold.woff" fontSize={0.09} color="hsl(0, 20%, 35%)" position={[0.5, -1.2, 0]} anchorX="left">
          Fish: 1%
        </Text>
      </group>
    </>
  );
};

interface CNNSceneProps {
  scrollProgress: number;
  activeStage: number;
  onStageClick: (stage: string) => void;
}

const CNNScene = ({ scrollProgress, activeStage, onStageClick }: CNNSceneProps) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 100 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <SceneContent
        scrollProgress={scrollProgress}
        activeStage={activeStage}
        onStageClick={onStageClick}
      />
    </Canvas>
  );
};

export default CNNScene;
