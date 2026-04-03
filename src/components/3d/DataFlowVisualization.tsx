import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";

// Flowing data streams between nodes
const DataStream = ({ from, to, color }: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 20;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      arr[i * 3] = from[0] + (to[0] - from[0]) * t;
      arr[i * 3 + 1] = from[1] + (to[1] - from[1]) * t + Math.sin(t * Math.PI) * 0.3;
      arr[i * 3 + 2] = from[2] + (to[2] - from[2]) * t;
    }
    return arr;
  }, [from, to]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const progress = ((i / count) + t * 0.3) % 1;
      pos[i * 3] = from[0] + (to[0] - from[0]) * progress;
      pos[i * 3 + 1] = from[1] + (to[1] - from[1]) * progress + Math.sin(progress * Math.PI) * 0.3;
      pos[i * 3 + 2] = from[2] + (to[2] - from[2]) * progress;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.05} transparent opacity={0.8} sizeAttenuation />
    </points>
  );
};

// Interactive 3D node
const InteractiveNode = ({ position, label, color, size = 0.3 }: {
  position: [number, number, number];
  label: string;
  color: string;
  size?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const hovered = useRef(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const targetScale = hovered.current ? size * 1.3 : size;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => { hovered.current = true; document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { hovered.current = false; document.body.style.cursor = "auto"; }}
      >
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color={color} transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

const DataFlowScene = () => {
  const nodes: { pos: [number, number, number]; label: string; color: string }[] = [
    { pos: [-3, 0, 0], label: "Input", color: "#AD2831" },
    { pos: [-1, 1, -1], label: "Conv", color: "#800E13" },
    { pos: [1, -0.5, 0.5], label: "Pool", color: "#640D14" },
    { pos: [3, 0.5, -0.5], label: "Dense", color: "#AD2831" },
  ];

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#AD2831" />

      {nodes.map((node, i) => (
        <Float key={i} speed={1.5} floatIntensity={0.3}>
          <InteractiveNode position={node.pos} label={node.label} color={node.color} />
        </Float>
      ))}

      {nodes.slice(0, -1).map((node, i) => (
        <DataStream key={i} from={node.pos} to={nodes[i + 1].pos} color="#AD2831" />
      ))}
    </>
  );
};

const DataFlowVisualization = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
        <DataFlowScene />
      </Canvas>
    </div>
  );
};

export default DataFlowVisualization;
