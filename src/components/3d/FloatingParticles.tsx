import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const Particles = ({ count = 50, color = "#AD2831" }: { count?: number; color?: string }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ],
      speed: Math.random() * 0.5 + 0.2,
      scale: Math.random() * 0.08 + 0.02,
      offset: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      const t = state.clock.elapsedTime;
      dummy.position.set(
        p.position[0] + Math.sin(t * p.speed + p.offset) * 0.5,
        p.position[1] + Math.cos(t * p.speed * 0.7 + p.offset) * 0.3,
        p.position[2]
      );
      dummy.scale.setScalar(p.scale * (1 + Math.sin(t * p.speed * 2) * 0.3));
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </instancedMesh>
  );
};

const FloatingParticles = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 z-0 pointer-events-none ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
        <Particles count={40} color="#AD2831" />
        <Particles count={20} color="#640D14" />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
};

export default FloatingParticles;
