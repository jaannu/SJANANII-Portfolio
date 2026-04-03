import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, Trail } from "@react-three/drei";
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

// Connection line between neurons
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
    const rot = new THREE.Euler(0, 0, Math.atan2(dir.y, dir.x));
    return { midpoint: mid, length: len, rotation: rot };
  }, [start, end]);

  useFrame((state) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity =
        Math.sin(state.clock.elapsedTime * speed) * 0.2 + 0.25;
    }
  });

  return (
    <mesh ref={meshRef} position={midpoint} rotation={rotation}>
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

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });

  const cellSize = 0.08;

  return (
    <group ref={groupRef} position={position}>
      {Array.from({ length: size * size }).map((_, i) => {
        const x = (i % size - size / 2 + 0.5) * cellSize;
        const y = (Math.floor(i / size) - size / 2 + 0.5) * cellSize;
        const val = Math.random();
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

// Mouse-following camera
const CameraRig = () => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.02;
    camera.position.y += (-mouse.current.y * 0.3 + 0.5 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  // Attach event listener
  useMemo(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return null;
};

// Main scene content
const SceneContent = () => {
  // Neural network layers
  const layers = [
    { x: -4, nodes: 5, label: "Input" },
    { x: -2, nodes: 6, label: "Conv1" },
    { x: 0, nodes: 4, label: "Pool" },
    { x: 2, nodes: 5, label: "Conv2" },
    { x: 4, nodes: 3, label: "Output" },
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

  // Generate connections between adjacent layers
  const connections = useMemo(() => {
    const conns: { start: [number, number, number]; end: [number, number, number] }[] = [];
    for (let l = 0; l < nodePositions.length - 1; l++) {
      for (const startPos of nodePositions[l]) {
        for (const endPos of nodePositions[l + 1]) {
          if (Math.random() > 0.4) {
            conns.push({ start: startPos, end: endPos });
          }
        }
      }
    }
    return conns;
  }, [nodePositions]);

  // Data particle paths
  const particlePaths = useMemo(() => {
    return Array.from({ length: 8 }).map(() => {
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

      <CameraRig />

      <Stars radius={20} depth={50} count={1500} factor={3} saturation={0} fade speed={1} />

      {/* Neural network nodes */}
      {nodePositions.map((layer, layerIndex) =>
        layer.map((pos, nodeIndex) => (
          <Float key={`node-${layerIndex}-${nodeIndex}`} speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
            <NeuronNode
              position={pos}
              color={colors[layerIndex % colors.length]}
              scale={layerIndex === 0 || layerIndex === nodePositions.length - 1 ? 1.2 : 1}
              pulseSpeed={0.5 + layerIndex * 0.3}
            />
          </Float>
        ))
      )}

      {/* Connections */}
      {connections.map((conn, i) => (
        <Connection
          key={`conn-${i}`}
          start={conn.start}
          end={conn.end}
          color="#AD2831"
          speed={0.5 + Math.random()}
        />
      ))}

      {/* Data particles */}
      {particlePaths.map((path, i) => (
        <DataParticle
          key={`particle-${i}`}
          path={path}
          color={colors[i % colors.length]}
          speed={0.3 + Math.random() * 0.3}
        />
      ))}

      {/* Convolution kernels floating around */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <ConvKernel position={[-1.5, 2, -1]} rotation={0} />
      </Float>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <ConvKernel position={[1.5, -1.8, -0.5]} rotation={2} />
      </Float>

      {/* Feature maps */}
      <Float speed={1} floatIntensity={0.5}>
        <FeatureMap position={[3, 2, -1.5]} size={5} />
      </Float>
      <Float speed={1.2} floatIntensity={0.6}>
        <FeatureMap position={[-3, -2, -1]} size={4} />
      </Float>
    </>
  );
};

const NeuralNetworkScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0.5, 7], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
};

export default NeuralNetworkScene;
