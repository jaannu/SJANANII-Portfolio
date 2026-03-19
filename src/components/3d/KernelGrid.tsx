import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface KernelGridProps {
  position?: [number, number, number];
  size?: number;
  kernelSize?: number;
  active?: boolean;
  onClick?: () => void;
  kernelType?: "edge" | "blur" | "sharpen";
}

const kernels = {
  edge: [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1],
  ],
  blur: [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ],
  sharpen: [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0],
  ],
};

const KernelGrid = ({
  position = [0, 0, 0],
  size = 0.5,
  kernelSize = 3,
  active = true,
  onClick,
  kernelType = "edge",
}: KernelGridProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current && active) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  const kernel = kernels[kernelType];
  const maxAbs = Math.max(...kernel.flat().map(Math.abs));

  const cells = useMemo(() => {
    const items: { pos: [number, number, number]; value: number; color: string }[] = [];
    const offset = (kernelSize * size) / 2 - size / 2;

    for (let r = 0; r < kernelSize; r++) {
      for (let c = 0; c < kernelSize; c++) {
        const value = kernel[r][c];
        const normalized = value / maxAbs;
        const x = c * size - offset;
        const y = (kernelSize - 1 - r) * size - offset;

        // Positive = bright crimson, Negative = dark, Zero = neutral
        let color: string;
        if (value > 0) {
          const l = 30 + (normalized * 30);
          color = `hsl(355, 80%, ${l}%)`;
        } else if (value < 0) {
          const l = 15 + (Math.abs(normalized) * 10);
          color = `hsl(220, 60%, ${l}%)`;
        } else {
          color = `hsl(350, 20%, 18%)`;
        }

        items.push({ pos: [x, y, 0], value, color });
      }
    }
    return items;
  }, [kernelSize, size, kernelType]);

  return (
    <group ref={groupRef} position={position} onClick={onClick}>
      {/* Glowing border */}
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[kernelSize * size + 0.2, kernelSize * size + 0.2, 0.06]} />
        <meshStandardMaterial
          color="hsl(355, 70%, 30%)"
          emissive="hsl(355, 70%, 43%)"
          emissiveIntensity={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>

      {cells.map((cell, i) => (
        <mesh key={i} position={cell.pos}>
          <boxGeometry args={[size * 0.85, size * 0.85, 0.18]} />
          <meshStandardMaterial
            color={cell.color}
            emissive={cell.value !== 0 ? cell.color : "black"}
            emissiveIntensity={cell.value !== 0 ? 0.3 : 0}
            metalness={0.5}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
};

export default KernelGrid;
