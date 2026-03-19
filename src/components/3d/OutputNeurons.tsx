import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface OutputNeuronsProps {
  position?: [number, number, number];
  active?: boolean;
  onClick?: () => void;
}

const neurons = [
  { label: "Cat", confidence: 0.92, y: 1.2 },
  { label: "Dog", confidence: 0.05, y: 0.4 },
  { label: "Bird", confidence: 0.02, y: -0.4 },
  { label: "Fish", confidence: 0.01, y: -1.2 },
];

const OutputNeurons = ({ position = [0, 0, 0], active = true, onClick }: OutputNeuronsProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current && active) {
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.05;
          child.scale.setScalar(scale);
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onClick}>
      {neurons.map((neuron, i) => {
        const size = 0.2 + neuron.confidence * 0.5;
        const l = 15 + neuron.confidence * 45;
        const emissive = neuron.confidence * 0.8;
        return (
          <mesh key={i} position={[0, neuron.y, 0]}>
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial
              color={`hsl(355, 80%, ${l}%)`}
              emissive={`hsl(355, 70%, ${l}%)`}
              emissiveIntensity={emissive}
              metalness={0.6}
              roughness={0.2}
            />
          </mesh>
        );
      })}

      {/* Connections between neurons */}
      {neurons.map((_, i) =>
        neurons.map((_, j) => {
          if (i >= j) return null;
          return (
            <mesh key={`${i}-${j}`} position={[0, (neurons[i].y + neurons[j].y) / 2, 0]}>
              <cylinderGeometry args={[0.005, 0.005, Math.abs(neurons[i].y - neurons[j].y), 4]} />
              <meshStandardMaterial
                color="hsl(355, 60%, 25%)"
                transparent
                opacity={0.2}
              />
            </mesh>
          );
        })
      )}
    </group>
  );
};

export default OutputNeurons;
