import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ConvolutionArrowsProps {
  from: [number, number, number];
  to: [number, number, number];
  active?: boolean;
}

const ConvolutionArrows = ({ from, to, active = true }: ConvolutionArrowsProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Group>(null);

  const midPoint: [number, number, number] = [
    (from[0] + to[0]) / 2,
    (from[1] + to[1]) / 2,
    (from[2] + to[2]) / 2,
  ];

  const direction = new THREE.Vector3(
    to[0] - from[0],
    to[1] - from[1],
    to[2] - from[2]
  );
  const length = direction.length();

  useFrame((state) => {
    if (particlesRef.current && active) {
      particlesRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const t = ((state.clock.elapsedTime * 0.5 + i * 0.25) % 1);
        mesh.position.set(
          from[0] + direction.x * t,
          from[1] + direction.y * t + Math.sin(t * Math.PI) * 0.2,
          from[2] + direction.z * t
        );
        const scale = Math.sin(t * Math.PI) * 0.08 + 0.03;
        mesh.scale.setScalar(scale);
        (mesh.material as THREE.MeshStandardMaterial).opacity = Math.sin(t * Math.PI);
      });
    }
  });

  // Rotation for the cylinder
  const dir = direction.clone().normalize();
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);

  return (
    <group ref={groupRef}>
      {/* Main line */}
      <mesh position={midPoint} quaternion={quaternion}>
        <cylinderGeometry args={[0.015, 0.015, length, 8]} />
        <meshStandardMaterial
          color="hsl(355, 70%, 35%)"
          emissive="hsl(355, 70%, 43%)"
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Flowing particles */}
      <group ref={particlesRef}>
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial
              color="hsl(355, 80%, 55%)"
              emissive="hsl(355, 80%, 55%)"
              emissiveIntensity={1}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export default ConvolutionArrows;
