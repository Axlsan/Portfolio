import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

type Variant = "torus" | "knot" | "crystal";

const Shape = ({ variant, wireframe }: { variant: Variant; wireframe: boolean }) => {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = s.clock.getElapsedTime() * 0.3;
  });

  const geom = (() => {
    switch (variant) {
      case "torus":
        return <torusKnotGeometry args={[0.9, 0.32, 200, 32]} />;
      case "knot":
        return <torusGeometry args={[1, 0.35, 32, 100]} />;
      case "crystal":
      default:
        return <octahedronGeometry args={[1.2, 0]} />;
    }
  })();

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={mesh} castShadow>
        {geom}
        {wireframe ? (
          <meshBasicMaterial color="#ff7a3d" wireframe />
        ) : (
          <meshStandardMaterial
            color="#e8d9c2"
            metalness={0.7}
            roughness={0.2}
            emissive="#ff5722"
            emissiveIntensity={0.08}
          />
        )}
      </mesh>
    </Float>
  );
};

export const ModelViewer = ({
  variant = "torus",
  wireframe = false,
}: {
  variant?: Variant;
  wireframe?: boolean;
}) => {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 4], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      shadows
      dpr={[1, 2]}
    >
      <color attach="background" args={["#1a1714"]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[4, 5, 3]} intensity={1.3} color="#ff8a4d" castShadow />
      <pointLight position={[-3, -2, -2]} intensity={0.8} color="#ff3a1a" />

      <Suspense fallback={null}>
        <Shape variant={variant} wireframe={wireframe} />
        <ContactShadows position={[0, -1.6, 0]} opacity={0.5} scale={6} blur={2.4} far={3} />
        <Environment preset="warehouse" />
      </Suspense>

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={2.5}
        maxDistance={7}
        autoRotate
        autoRotateSpeed={0.6}
      />
    </Canvas>
  );
};
