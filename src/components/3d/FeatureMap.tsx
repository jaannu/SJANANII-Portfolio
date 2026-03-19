import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FeatureMapProps {
  position?: [number, number, number];
  size?: number;
  gridSize?: number;
  active?: boolean;
  onClick?: () => void;
  mapIndex?: number;
}

// Simulated feature map outputs
const featureMaps = [
  // Edge detection result
  [
    [0.0, 0.1, 0.6, 0.8, 0.1],
    [0.2, 0.7, 0.2, 0.3, 0.6],
    [0.8, 0.3, 0.0, 0.3, 0.8],
    [0.2, 0.7, 0.2, 0.3, 0.6],
    [0.0, 0.1, 0.6, 0.8, 0.1],
  ],
  // Blur result
  [
    [0.3, 0.4, 0.6, 0.6, 0.4],
    [0.4, 0.5, 0.6, 0.6, 0.5],
    [0.5, 0.6, 0.4, 0.5, 0.6],
    [0.4, 0.5, 0.6, 0.6, 0.5],
    [0.3, 0.4, 0.6, 0.6, 0.4],
  ],
  // Sharpen result
  [
    [0.0, 0.0, 0.3, 0.9, 0.0],
    [0.0, 0.4, 0.9, 0.8, 0.3],
    [0.4, 0.9, 0.0, 0.2, 0.9],
    [0.0, 0.4, 0.9, 0.8, 0.3],
    [0.0, 0.0, 0.3, 0.9, 0.0],
  ],
];

const FeatureMap = ({
  position = [0, 0, 0],
  size = 0.45,
  gridSize = 5,
  active = true,
  onClick,
  mapIndex = 0,
}: FeatureMapProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const data = featureMaps[mapIndex % featureMaps.length];

  useFrame((state) => {
    if (groupRef.current && active) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4 + mapIndex) * 0.08;
    }
  });

  const cells = useMemo(() => {
    const items: { pos: [number, number, number]; intensity: number; height: number }[] = [];
    const offset = (gridSize * size) / 2 - size / 2;

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const intensity = data[r]?.[c] ?? 0;
        const x = c * size - offset;
        const y = (gridSize - 1 - r) * size - offset;
        const height = 0.1 + intensity * 0.4;

        items.push({ pos: [x, y, height / 2], intensity, height });
      }
    }
    return items;
  }, [gridSize, size, mapIndex]);

  return (
    <group ref={groupRef} position={position} onClick={onClick}>
      {/* Base */}
      <mesh position={[0, 0, -0.08]}>
        <boxGeometry args={[gridSize * size + 0.2, gridSize * size + 0.2, 0.05]} />
        <meshStandardMaterial color="hsl(350, 50%, 12%)" transparent opacity={0.7} />
      </mesh>

      {cells.map((cell, i) => {
        const l = 15 + cell.intensity * 40;
        const emissiveIntensity = cell.intensity * 0.5;
        return (
          <mesh key={i} position={cell.pos}>
            <boxGeometry args={[size * 0.85, size * 0.85, cell.height]} />
            <meshStandardMaterial
              color={`hsl(355, 75%, ${l}%)`}
              emissive={`hsl(355, 70%, ${l}%)`}
              emissiveIntensity={emissiveIntensity}
              metalness={0.4}
              roughness={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default FeatureMap;
