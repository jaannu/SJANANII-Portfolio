import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface InputGridProps {
  position?: [number, number, number];
  size?: number;
  gridSize?: number;
  highlight?: [number, number] | null;
  kernelSize?: number;
  active?: boolean;
  onClick?: () => void;
}

// Sample "image" data - pixel intensities for a 7x7 grid
const imageData = [
  [0.1, 0.1, 0.2, 0.8, 0.9, 0.2, 0.1],
  [0.1, 0.3, 0.8, 0.9, 0.8, 0.3, 0.1],
  [0.2, 0.8, 0.5, 0.3, 0.5, 0.8, 0.2],
  [0.7, 0.9, 0.3, 0.1, 0.3, 0.9, 0.7],
  [0.2, 0.8, 0.5, 0.3, 0.5, 0.8, 0.2],
  [0.1, 0.3, 0.8, 0.9, 0.8, 0.3, 0.1],
  [0.1, 0.1, 0.2, 0.8, 0.9, 0.2, 0.1],
];

const InputGrid = ({
  position = [0, 0, 0],
  size = 0.4,
  gridSize = 7,
  highlight = null,
  kernelSize = 3,
  active = true,
  onClick,
}: InputGridProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current && active) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  const cells = useMemo(() => {
    const items: { pos: [number, number, number]; color: string; intensity: number; row: number; col: number }[] = [];
    const offset = (gridSize * size) / 2 - size / 2;

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const intensity = imageData[r]?.[c] ?? 0.5;
        const x = c * size - offset;
        const y = (gridSize - 1 - r) * size - offset;

        // Crimson-based color: darker = low intensity, bright crimson = high
        const h = 355;
        const s = 70 + intensity * 15;
        const l = 10 + intensity * 45;
        const color = `hsl(${h}, ${s}%, ${l}%)`;

        items.push({ pos: [x, y, 0], color, intensity, row: r, col: c });
      }
    }
    return items;
  }, [gridSize, size]);

  const isHighlighted = (row: number, col: number) => {
    if (!highlight) return false;
    const [hr, hc] = highlight;
    const half = Math.floor(kernelSize / 2);
    return row >= hr - half && row <= hr + half && col >= hc - half && col <= hc + half;
  };

  return (
    <group ref={groupRef} position={position} onClick={onClick}>
      {/* Back plate */}
      <mesh position={[0, 0, -0.15]}>
        <boxGeometry args={[gridSize * size + 0.3, gridSize * size + 0.3, 0.08]} />
        <meshStandardMaterial color="hsl(350, 70%, 10%)" transparent opacity={0.8} />
      </mesh>

      {/* Label */}
      {cells.map((cell, i) => {
        const highlighted = isHighlighted(cell.row, cell.col);
        return (
          <mesh key={i} position={cell.pos}>
            <boxGeometry args={[size * 0.88, size * 0.88, highlighted ? 0.25 : 0.12]} />
            <meshStandardMaterial
              color={cell.color}
              emissive={highlighted ? "hsl(355, 70%, 43%)" : "black"}
              emissiveIntensity={highlighted ? 0.6 : 0}
              metalness={0.3}
              roughness={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default InputGrid;
