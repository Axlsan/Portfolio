import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const WavingMan = () => {
  const group = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const head = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.4) * 0.25;
      group.current.position.y = Math.sin(t * 1.2) * 0.05 - 0.2;
    }
    if (rightArm.current) {
      // Wave: arm raised, hand swinging side to side
      rightArm.current.rotation.z = -2.0 + Math.sin(t * 6) * 0.35;
      rightArm.current.rotation.x = 0.2;
    }
    if (leftArm.current) {
      leftArm.current.rotation.z = 0.25;
    }
    if (head.current) {
      head.current.rotation.z = Math.sin(t * 6) * 0.05;
    }
  });

  const skin = (
    <meshStandardMaterial
      color="#ff7a3d"
      emissive="#ff3a1a"
      emissiveIntensity={0.35}
      roughness={0.3}
      metalness={0.6}
    />
  );

  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={group} scale={1.1}>
        {/* Head */}
        <mesh ref={head} position={[0, 1.35, 0]} castShadow>
          <sphereGeometry args={[0.32, 32, 32]} />
          {skin}
        </mesh>
        {/* Neck */}
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[0.09, 0.11, 0.15, 16]} />
          {skin}
        </mesh>
        {/* Torso */}
        <mesh position={[0, 0.5, 0]}>
          <capsuleGeometry args={[0.32, 0.7, 8, 16]} />
          {skin}
        </mesh>
        {/* Hips */}
        <mesh position={[0, -0.15, 0]}>
          <sphereGeometry args={[0.34, 16, 16]} />
          {skin}
        </mesh>

        {/* Right arm (waving) — pivots from shoulder */}
        <group ref={rightArm} position={[0.38, 0.85, 0]}>
          <mesh position={[0, -0.4, 0]}>
            <capsuleGeometry args={[0.09, 0.7, 8, 16]} />
            {skin}
          </mesh>
          <mesh position={[0, -0.85, 0]}>
            <sphereGeometry args={[0.13, 16, 16]} />
            {skin}
          </mesh>
        </group>

        {/* Left arm (resting) */}
        <group ref={leftArm} position={[-0.38, 0.85, 0]}>
          <mesh position={[0, -0.4, 0]}>
            <capsuleGeometry args={[0.09, 0.7, 8, 16]} />
            {skin}
          </mesh>
          <mesh position={[0, -0.85, 0]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            {skin}
          </mesh>
        </group>

        {/* Legs */}
        <mesh position={[0.16, -0.85, 0]}>
          <capsuleGeometry args={[0.11, 0.8, 8, 16]} />
          {skin}
        </mesh>
        <mesh position={[-0.16, -0.85, 0]}>
          <capsuleGeometry args={[0.11, 0.8, 8, 16]} />
          {skin}
        </mesh>
      </group>
    </Float>
  );
};

const Shell = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const geomRef = useRef<THREE.IcosahedronGeometry>(null);

  // Cache rest positions + a random phase per vertex so each node moves independently
  const { basePositions, phases } = useMemo(() => {
    const geom = new THREE.IcosahedronGeometry(1, 1);
    const pos = geom.attributes.position as THREE.BufferAttribute;
    const base = new Float32Array(pos.array);
    const ph = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) ph[i] = Math.random() * Math.PI * 2;
    geom.dispose();
    return { basePositions: base, phases: ph };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = -t * 0.08;
      mesh.current.rotation.z = t * 0.05;
    }
    const geom = geomRef.current;
    if (!geom) return;
    const pos = geom.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const ix = i * 3;
      const bx = basePositions[ix];
      const by = basePositions[ix + 1];
      const bz = basePositions[ix + 2];
      const len = Math.sqrt(bx * bx + by * by + bz * bz) || 1;
      // Independent radial wobble per vertex
      const wobble =
        0.12 * Math.sin(t * 1.6 + phases[i]) +
        0.06 * Math.sin(t * 3.1 + phases[i] * 1.7);
      const k = 1 + wobble;
      pos.array[ix] = bx * k;
      pos.array[ix + 1] = by * k;
      pos.array[ix + 2] = bz * k;
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={mesh} scale={2.6}>
      <icosahedronGeometry ref={geomRef} args={[1, 4]} />
      <meshBasicMaterial color="#ff8a4d" wireframe transparent opacity={0.22} />
    </mesh>
  );
};

const FloatingShards = () => {
  const shards = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 4,
        ] as [number, number, number],
        scale: 0.1 + Math.random() * 0.2,
        speed: 0.3 + Math.random() * 0.4,
        offset: i,
      })),
    []
  );

  return (
    <>
      {shards.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={2} floatIntensity={1}>
          <mesh position={s.position} scale={s.scale}>
            <tetrahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#ff6a2a"
              emissive="#ff6a2a"
              emissiveIntensity={0.6}
              roughness={0.4}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};

export const HeroScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#13100e"]} />
      <fog attach="fog" args={["#13100e", 6, 14]} />

      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} color="#ff7a3d" />
      <pointLight position={[-4, -2, -2]} intensity={1.5} color="#ff3a1a" />
      <pointLight position={[3, 4, 2]} intensity={0.6} color="#ffd9b3" />

      <WavingMan />
      <Shell />
      <FloatingShards />

      <Sparkles count={60} scale={8} size={2} speed={0.3} color="#ffaa66" />

      <Environment preset="sunset" />
    </Canvas>
  );
};
