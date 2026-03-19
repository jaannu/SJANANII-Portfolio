import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PoolingLayerProps {
  position?: [number, number, number];
  size?: number;
  gridSize?: number;
  active?: boolean;
  onClick?: () => void;
}

const pooledData = [
  [0.8, 0.9],
  [0.9, 0.8],
];

const PoolingLayer = ({
  position = [0, 0, 0],
  size = 0.6,
  gridSize = 2,
  active = true,
  onClick,
}: PoolingLayerProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current && active) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.06;
    }
  });

  const cells = useMemo(() => {
    const items: { pos: [number, number, number]; intensity: number }[] = [];
    const offset = (gridSize * size) / 2 - size / 2;

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const intensity = pooledData[r][c];
        const x = c * size - offset;
        const y = (gridSize - 1 - r) * size - offset;
        items.push({ pos: [x, y, 0], intensity });
      }
    }
    return items;
  }, [gridSize, size]);

  return (
    <group ref={groupRef} position={position} onClick={onClick}>
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[gridSize * size + 0.2, gridSize * size + 0.2, 0.05]} />
        <meshStandardMaterial color="hsl(350, 50%, 12%)" transparent opacity={0.6} />
      </mesh>

      {cells.map((cell, i) => {
        const l = 25 + cell.intensity * 35;
        return (
          <mesh key={i} position={cell.pos}>
            <boxGeometry args={[size * 0.85, size * 0.85, 0.3 + cell.intensity * 0.2]} />
            <meshStandardMaterial
              color={`hsl(355, 80%, ${l}%)`}
              emissive={`hsl(355, 70%, ${l}%)`}
              emissiveIntensity={0.5}
              metalness={0.5}
              roughness={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default PoolingLayer;
