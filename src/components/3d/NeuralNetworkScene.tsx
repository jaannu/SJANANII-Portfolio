import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, Trail, Html } from "@react-three/drei";
import * as THREE from "three";

// Neural network node
const NeuronNode = ({ position, color, scale = 1, pulseSpeed = 1 }: {
  position: [number, number, number];
  color: string;
  scale?: number;
  pulseSpeed?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.15 + 1;
      meshRef.current.scale.setScalar(scale * pulse);
    }
    if (glowRef.current) {
      const glow = Math.sin(state.clock.elapsedTime * pulseSpeed + 1) * 0.3 + 0.5;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = glow * 0.3;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.12 * scale, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.25 * scale, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

// Connection between neurons using thin box
const Connection = ({ start, end, color, speed = 1 }: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  speed?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const { midpoint, length, rotation } = useMemo(() => {
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    const mid = s.clone().add(e).multiplyScalar(0.5);
    const dir = e.clone().sub(s);
    const len = dir.length();
    // Calculate rotation to align with direction
    const angle = Math.atan2(dir.y, dir.x);
    return { midpoint: mid, length: len, rotation: angle };
  }, [start, end]);

  useFrame((state) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity =
        Math.sin(state.clock.elapsedTime * speed) * 0.2 + 0.25;
    }
  });

  return (
    <mesh ref={meshRef} position={midpoint} rotation={[0, 0, rotation]}>
      <planeGeometry args={[length, 0.015]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
    </mesh>
  );
};

// Data particle flowing through the network
const DataParticle = ({ path, color, speed = 0.5 }: {
  path: [number, number, number][];
  color: string;
  speed?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const progress = useRef(Math.random());

  useFrame((_, delta) => {
    if (!meshRef.current || path.length < 2) return;
    progress.current = (progress.current + delta * speed) % 1;

    const totalSegments = path.length - 1;
    const segmentProgress = progress.current * totalSegments;
    const segmentIndex = Math.floor(segmentProgress);
    const t = segmentProgress - segmentIndex;

    const from = path[Math.min(segmentIndex, path.length - 1)];
    const to = path[Math.min(segmentIndex + 1, path.length - 1)];

    meshRef.current.position.set(
      from[0] + (to[0] - from[0]) * t,
      from[1] + (to[1] - from[1]) * t,
      from[2] + (to[2] - from[2]) * t
    );
  });

  return (
    <Trail width={0.5} length={6} color={color} attenuation={(w) => w * w}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
};

// Convolution kernel visualization
const ConvKernel = ({ position, rotation = 0 }: {
  position: [number, number, number];
  rotation?: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3 + rotation;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  const gridSize = 3;
  const cellSize = 0.12;

  return (
    <group ref={groupRef} position={position}>
      {Array.from({ length: gridSize * gridSize }).map((_, i) => {
        const x = (i % gridSize - 1) * cellSize;
        const y = (Math.floor(i / gridSize) - 1) * cellSize;
        const intensity = Math.random() * 0.5 + 0.5;
        return (
          <mesh key={i} position={[x, y, 0]}>
            <boxGeometry args={[cellSize * 0.85, cellSize * 0.85, 0.02]} />
            <meshStandardMaterial
              color="#AD2831"
              emissive="#AD2831"
              emissiveIntensity={intensity}
              transparent
              opacity={0.7 + intensity * 0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Feature map grid
const FeatureMap = ({ position, size = 4 }: {
  position: [number, number, number];
  size?: number;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const values = useMemo(() => Array.from({ length: size * size }).map(() => Math.random()), [size]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });

  const cellSize = 0.08;

  return (
    <group ref={groupRef} position={position}>
      {values.map((val, i) => {
        const x = (i % size - size / 2 + 0.5) * cellSize;
        const y = (Math.floor(i / size) - size / 2 + 0.5) * cellSize;
        return (
          <mesh key={i} position={[x, y, 0]}>
            <planeGeometry args={[cellSize * 0.9, cellSize * 0.9]} />
            <meshBasicMaterial
              color={val > 0.5 ? "#AD2831" : "#640D14"}
              transparent
              opacity={0.3 + val * 0.7}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Scroll-driven camera
const ScrollCamera = ({ scrollProgress }: { scrollProgress: number }) => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useFrame(() => {
    // Scroll-driven camera movement through the network
    const targetX = mouse.current.x * 0.8 + scrollProgress * 12 - 5;
    const targetY = -mouse.current.y * 0.4 + Math.sin(scrollProgress * Math.PI) * 1.5;
    const targetZ = 8 - scrollProgress * 3;

    camera.position.x += (targetX - camera.position.x) * 0.03;
    camera.position.y += (targetY - camera.position.y) * 0.03;
    camera.position.z += (targetZ - camera.position.z) * 0.03;
    camera.lookAt(camera.position.x, 0, 0);
  });

  return null;
};

// Stage label floating in 3D
const StageLabel = ({ position, text, subtext }: {
  position: [number, number, number];
  text: string;
  subtext?: string;
}) => {
  return (
    <Html position={position} center distanceFactor={8} className="pointer-events-none select-none">
      <div className="text-center whitespace-nowrap">
        <div className="text-accent font-mono text-xs tracking-widest uppercase opacity-80">{text}</div>
        {subtext && <div className="text-muted-foreground font-mono text-[10px] mt-1 opacity-60">{subtext}</div>}
      </div>
    </Html>
  );
};

// Main scene content
const SceneContent = ({ scrollProgress }: { scrollProgress: number }) => {
  const layers = [
    { x: -4, nodes: 5, label: "Input", sub: "Raw Pixels" },
    { x: -1.5, nodes: 6, label: "Conv Layer 1", sub: "Feature Extraction" },
    { x: 1, nodes: 4, label: "Pooling", sub: "Dimensionality Reduction" },
    { x: 3.5, nodes: 5, label: "Conv Layer 2", sub: "Deep Features" },
    { x: 6, nodes: 3, label: "Output", sub: "Classification" },
  ];

  const nodePositions = useMemo(() => {
    return layers.map(layer => {
      return Array.from({ length: layer.nodes }).map((_, i) => {
        const spacing = 0.8;
        const y = (i - (layer.nodes - 1) / 2) * spacing;
        return [layer.x, y, 0] as [number, number, number];
      });
    });
  }, []);

  const connections = useMemo(() => {
    const conns: { start: [number, number, number]; end: [number, number, number] }[] = [];
    for (let l = 0; l < nodePositions.length - 1; l++) {
      for (const startPos of nodePositions[l]) {
        for (const endPos of nodePositions[l + 1]) {
          if (Math.random() > 0.5) {
            conns.push({ start: startPos, end: endPos });
          }
        }
      }
    }
    return conns;
  }, [nodePositions]);

  const particlePaths = useMemo(() => {
    return Array.from({ length: 10 }).map(() => {
      return nodePositions.map(layer => {
        const randomNode = layer[Math.floor(Math.random() * layer.length)];
        return randomNode;
      });
    });
  }, [nodePositions]);

  const colors = ["#AD2831", "#800E13", "#640D14", "#ff4d5a", "#ff8a8a"];

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#AD2831" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#640D14" />
      <pointLight position={[0, 3, -5]} intensity={0.3} color="#ff4d5a" />
      <fog attach="fog" args={["#250902", 5, 25]} />

      <ScrollCamera scrollProgress={scrollProgress} />

      <Stars radius={30} depth={60} count={2000} factor={3} saturation={0} fade speed={0.5} />

      {/* Stage labels */}
      {layers.map((layer, i) => (
        <StageLabel key={`label-${i}`} position={[layer.x, -3, 0]} text={layer.label} subtext={layer.sub} />
      ))}

      {/* Neural network nodes */}
      {nodePositions.map((layer, layerIndex) =>
        layer.map((pos, nodeIndex) => (
          <Float key={`node-${layerIndex}-${nodeIndex}`} speed={1.5} rotationIntensity={0} floatIntensity={0.2}>
            <NeuronNode
              position={pos}
              color={colors[layerIndex % colors.length]}
              scale={layerIndex === 0 || layerIndex === nodePositions.length - 1 ? 1.3 : 1}
              pulseSpeed={0.5 + layerIndex * 0.3}
            />
          </Float>
        ))
      )}

      {/* Connections */}
      {connections.map((conn, i) => (
        <Connection key={`conn-${i}`} start={conn.start} end={conn.end} color="#AD2831" speed={0.5 + Math.random()} />
      ))}

      {/* Data particles */}
      {particlePaths.map((path, i) => (
        <DataParticle key={`particle-${i}`} path={path} color={colors[i % colors.length]} speed={0.3 + Math.random() * 0.3} />
      ))}

      {/* Convolution kernels */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <ConvKernel position={[-0.5, 2.5, -1]} rotation={0} />
      </Float>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <ConvKernel position={[2, -2.5, -0.5]} rotation={2} />
      </Float>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.9}>
        <ConvKernel position={[5, 2, -1.5]} rotation={4} />
      </Float>

      {/* Feature maps */}
      <Float speed={1} floatIntensity={0.5}>
        <FeatureMap position={[0, 2.8, -1.5]} size={5} />
      </Float>
      <Float speed={1.2} floatIntensity={0.6}>
        <FeatureMap position={[4.5, -2.8, -1]} size={6} />
      </Float>
      <Float speed={0.8} floatIntensity={0.4}>
        <FeatureMap position={[-3, -2.5, -2]} size={4} />
      </Float>
    </>
  );
};

const NeuralNetworkScene = ({ scrollProgress = 0 }: { scrollProgress?: number }) => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0.5, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#250902"]} />
        <SceneContent scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};

export default NeuralNetworkScene;
