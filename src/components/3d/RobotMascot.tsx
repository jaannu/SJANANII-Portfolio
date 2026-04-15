import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const RobotBody = () => {
  const groupRef = useRef<THREE.Group>(null);
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);
  const antennaRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Gentle idle bob
    groupRef.current.rotation.z = Math.sin(t * 0.8) * 0.05;
    groupRef.current.rotation.x = Math.sin(t * 0.6) * 0.03;

    // Eye blink every ~4 seconds
    if (eyeLeftRef.current && eyeRightRef.current) {
      const blink = Math.sin(t * 0.8) > 0.98 ? 0.01 : 0.08;
      eyeLeftRef.current.scale.y = THREE.MathUtils.lerp(eyeLeftRef.current.scale.y, blink === 0.01 ? 0.2 : 1, 0.3);
      eyeRightRef.current.scale.y = eyeLeftRef.current.scale.y;
    }

    // Antenna glow pulse
    if (antennaRef.current) {
      const mat = antennaRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = Math.sin(t * 3) * 0.5 + 1;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      {/* Head */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.7, 0.6, 0.5]} />
        <meshStandardMaterial
          color="hsl(0, 70%, 35%)"
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Face plate */}
      <mesh position={[0, 0.3, 0.26]}>
        <boxGeometry args={[0.55, 0.4, 0.02]} />
        <meshStandardMaterial
          color="hsl(0, 50%, 15%)"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Left eye */}
      <mesh ref={eyeLeftRef} position={[-0.13, 0.35, 0.28]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial
          color="#ff4d5a"
          emissive="#ff4d5a"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Right eye */}
      <mesh ref={eyeRightRef} position={[0.13, 0.35, 0.28]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial
          color="#ff4d5a"
          emissive="#ff4d5a"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Mouth - LED strip */}
      <mesh position={[0, 0.18, 0.28]}>
        <boxGeometry args={[0.25, 0.04, 0.01]} />
        <meshStandardMaterial
          color="#AD2831"
          emissive="#AD2831"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Antenna base */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.1, 8]} />
        <meshStandardMaterial color="hsl(0, 40%, 40%)" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Antenna tip */}
      <mesh ref={antennaRef} position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial
          color="#ff4d5a"
          emissive="#ff4d5a"
          emissiveIntensity={1}
        />
      </mesh>

      {/* Body */}
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[0.55, 0.5, 0.4]} />
        <meshStandardMaterial
          color="hsl(0, 60%, 30%)"
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>

      {/* Chest panel */}
      <mesh position={[0, -0.2, 0.21]}>
        <boxGeometry args={[0.3, 0.25, 0.02]} />
        <meshStandardMaterial
          color="hsl(0, 50%, 15%)"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Chest LED dots */}
      {[[-0.08, -0.12], [0, -0.12], [0.08, -0.12], [-0.08, -0.2], [0, -0.2], [0.08, -0.2]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.23]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#AD2831" : "#640D14"}
            emissive={i % 2 === 0 ? "#AD2831" : "#640D14"}
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}

      {/* Left arm */}
      <mesh position={[-0.4, -0.2, 0]}>
        <capsuleGeometry args={[0.06, 0.25, 4, 8]} />
        <meshStandardMaterial color="hsl(0, 50%, 35%)" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Right arm */}
      <mesh position={[0.4, -0.2, 0]}>
        <capsuleGeometry args={[0.06, 0.25, 4, 8]} />
        <meshStandardMaterial color="hsl(0, 50%, 35%)" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
};

const RobotMascot = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide in hero area (first 600px)
  useEffect(() => {
    setVisible(scrollY > 600);
  }, [scrollY]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 w-28 h-28 md:w-36 md:h-36 pointer-events-auto cursor-pointer transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 3]} intensity={0.8} color="#AD2831" />
        <pointLight position={[-2, -1, 2]} intensity={0.3} color="#ff4d5a" />
        <Float speed={3} rotationIntensity={0.3} floatIntensity={0.5}>
          <RobotBody />
        </Float>
      </Canvas>
    </div>
  );
};

export default RobotMascot;
