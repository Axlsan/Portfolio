import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Shared low-poly material factory (flatShading gives the faceted look)
const lowPolyMat = (color: string, opts: { emissive?: string; emissiveIntensity?: number; roughness?: number; metalness?: number } = {}) => (
  <meshStandardMaterial
    color={color}
    emissive={opts.emissive ?? "#000000"}
    emissiveIntensity={opts.emissiveIntensity ?? 0}
    roughness={opts.roughness ?? 0.8}
    metalness={opts.metalness ?? 0.05}
    flatShading
  />
);

const WavingMan = () => {
  const group = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const { pointer, gl } = useThree();

  // Drag state for the head
  const dragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const dragRot = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dom = gl.domElement;
    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      lastPointer.current = { x: e.clientX, y: e.clientY };
      dom.style.cursor = "grabbing";
      (e.target as Element).setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      lastPointer.current = { x: e.clientX, y: e.clientY };
      dragRot.current.y += dx * 0.01;
      dragRot.current.x += dy * 0.01;
      // clamp so the head doesn't spin absurdly
      dragRot.current.x = Math.max(-1.0, Math.min(1.0, dragRot.current.x));
      dragRot.current.y = Math.max(-1.6, Math.min(1.6, dragRot.current.y));
    };
    const onUp = () => {
      dragging.current = false;
      dom.style.cursor = "grab";
    };
    dom.style.cursor = "grab";
    dom.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      dom.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [gl]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.3) * 0.15;
      group.current.position.y = Math.sin(t * 1.2) * 0.05 - 0.2;
    }
    // Right arm raised waving — pivots ABOVE the shoulder so the hand is up high & out to the side, clear of the head
    if (rightArm.current) {
      // base rotation tilts the arm outward (positive z rotates the down-hanging arm to the character's right)
      rightArm.current.rotation.z = 2.3 + Math.sin(t * 6) * 0.25;
      rightArm.current.rotation.x = 0.1;
    }
    if (leftArm.current) {
      leftArm.current.rotation.z = -0.05 - Math.sin(t * 1.2) * 0.04;
    }
    // Head: blend mouse-tracking with drag offset
    if (head.current) {
      const targetY = dragRot.current.y + (dragging.current ? 0 : pointer.x * 0.6);
      const targetX = dragRot.current.x + (dragging.current ? 0 : -pointer.y * 0.4);
      head.current.rotation.y += (targetY - head.current.rotation.y) * 0.15;
      head.current.rotation.x += (targetX - head.current.rotation.x) * 0.15;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.25}>
      <group ref={group} scale={1.1}>
        {/* HEAD GROUP (tracks mouse) */}
        <group ref={head} position={[0, 1.35, 0]}>
          {/* Skull — low poly sphere */}
          <mesh castShadow>
            <icosahedronGeometry args={[0.32, 1]} />
            {lowPolyMat("#e8a07a", { roughness: 0.6 })}
          </mesh>
          {/* Hair — top cap, slightly larger, dark */}
          <mesh position={[0, 0.08, -0.02]} rotation={[0.15, 0, 0]}>
            <sphereGeometry args={[0.345, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            {lowPolyMat("#1a1410", { roughness: 0.9 })}
          </mesh>
          {/* Hair tuft / fringe */}
          <mesh position={[0.08, 0.18, 0.22]} rotation={[0.4, -0.3, 0.2]}>
            <tetrahedronGeometry args={[0.12, 0]} />
            {lowPolyMat("#1a1410", { roughness: 0.9 })}
          </mesh>
          {/* Eyes */}
          <mesh position={[0.11, 0.02, 0.27]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color="#0a0a0a" />
          </mesh>
          <mesh position={[-0.11, 0.02, 0.27]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color="#0a0a0a" />
          </mesh>
          {/* Nose */}
          <mesh position={[0, -0.04, 0.3]} rotation={[0, 0, Math.PI]}>
            <coneGeometry args={[0.04, 0.09, 4]} />
            {lowPolyMat("#d4906a", { roughness: 0.6 })}
          </mesh>
        </group>

        {/* Neck */}
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[0.09, 0.11, 0.15, 6]} />
          {lowPolyMat("#e8a07a", { roughness: 0.6 })}
        </mesh>

        {/* Torso — faceted trapezoid (wider at shoulders, narrower at waist) */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.28, 0.38, 0.95, 6]} />
          {lowPolyMat("#ff6a2a", { emissive: "#ff3a1a", emissiveIntensity: 0.2, roughness: 0.7 })}
        </mesh>
        {/* Shirt V-neck collar accent */}
        <mesh position={[0, 0.92, 0.22]} rotation={[0.4, 0, Math.PI]}>
          <coneGeometry args={[0.1, 0.16, 3]} />
          {lowPolyMat("#2a1a14", { roughness: 0.8 })}
        </mesh>

        {/* Belt */}
        <mesh position={[0, 0.0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.08, 6]} />
          {lowPolyMat("#1a1410", { roughness: 0.7, metalness: 0.3 })}
        </mesh>

        {/* Right arm (waving) — pivots at shoulder; mesh hangs downward from origin */}
        <group ref={rightArm} position={[0.34, 0.92, 0]}>
          {/* Shoulder cap */}
          <mesh position={[0, 0, 0]}>
            <icosahedronGeometry args={[0.13, 0]} />
            {lowPolyMat("#ff6a2a", { emissive: "#ff3a1a", emissiveIntensity: 0.2, roughness: 0.7 })}
          </mesh>
          {/* Upper arm sleeve */}
          <mesh position={[0, -0.18, 0]}>
            <cylinderGeometry args={[0.1, 0.085, 0.36, 6]} />
            {lowPolyMat("#ff6a2a", { emissive: "#ff3a1a", emissiveIntensity: 0.2, roughness: 0.7 })}
          </mesh>
          {/* Forearm skin */}
          <mesh position={[0, -0.55, 0]}>
            <cylinderGeometry args={[0.078, 0.07, 0.36, 6]} />
            {lowPolyMat("#e8a07a", { roughness: 0.6 })}
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.78, 0]}>
            <icosahedronGeometry args={[0.11, 0]} />
            {lowPolyMat("#e8a07a", { roughness: 0.6 })}
          </mesh>
        </group>

        {/* Left arm (resting) */}
        <group ref={leftArm} position={[-0.34, 0.92, 0]}>
          <mesh position={[0, 0, 0]}>
            <icosahedronGeometry args={[0.13, 0]} />
            {lowPolyMat("#ff6a2a", { emissive: "#ff3a1a", emissiveIntensity: 0.2, roughness: 0.7 })}
          </mesh>
          <mesh position={[0, -0.18, 0]}>
            <cylinderGeometry args={[0.1, 0.085, 0.36, 6]} />
            {lowPolyMat("#ff6a2a", { emissive: "#ff3a1a", emissiveIntensity: 0.2, roughness: 0.7 })}
          </mesh>
          <mesh position={[0, -0.55, 0]}>
            <cylinderGeometry args={[0.078, 0.07, 0.36, 6]} />
            {lowPolyMat("#e8a07a", { roughness: 0.6 })}
          </mesh>
          <mesh position={[0, -0.78, 0]}>
            <icosahedronGeometry args={[0.11, 0]} />
            {lowPolyMat("#e8a07a", { roughness: 0.6 })}
          </mesh>
        </group>

        {/* Legs — pants */}
        <mesh position={[0.16, -0.5, 0]}>
          <cylinderGeometry args={[0.14, 0.11, 0.85, 6]} />
          {lowPolyMat("#2a2a3a", { roughness: 0.85 })}
        </mesh>
        <mesh position={[-0.16, -0.5, 0]}>
          <cylinderGeometry args={[0.14, 0.11, 0.85, 6]} />
          {lowPolyMat("#2a2a3a", { roughness: 0.85 })}
        </mesh>
        {/* Shoes */}
        <mesh position={[0.18, -0.96, 0.06]}>
          <boxGeometry args={[0.18, 0.12, 0.3]} />
          {lowPolyMat("#0d0d0d", { roughness: 0.6 })}
        </mesh>
        <mesh position={[-0.18, -0.96, 0.06]}>
          <boxGeometry args={[0.18, 0.12, 0.3]} />
          {lowPolyMat("#0d0d0d", { roughness: 0.6 })}
        </mesh>
      </group>
    </Float>
  );
};

const Shell = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const geomRef = useRef<THREE.IcosahedronGeometry>(null);

  const { basePositions, nodePhases } = useMemo(() => {
    const geom = new THREE.IcosahedronGeometry(1, 1);
    const pos = geom.attributes.position as THREE.BufferAttribute;
    const base = new Float32Array(pos.array);
    const phasesByKey = new Map<string, number>();
    const ph = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) {
      const ix = i * 3;
      const key = `${base[ix].toFixed(5)},${base[ix + 1].toFixed(5)},${base[ix + 2].toFixed(5)}`;
      if (!phasesByKey.has(key)) phasesByKey.set(key, Math.random() * Math.PI * 2);
      ph[i] = phasesByKey.get(key)!;
    }
    geom.dispose();
    return { basePositions: base, nodePhases: ph };
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
      const wobble =
        0.06 * Math.sin(t * 1.4 + nodePhases[i]) +
        0.03 * Math.sin(t * 2.6 + nodePhases[i] * 1.7);
      const k = 1 + wobble;
      pos.array[ix] = bx * k;
      pos.array[ix + 1] = by * k;
      pos.array[ix + 2] = bz * k;
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={mesh} scale={2.6}>
      <icosahedronGeometry ref={geomRef} args={[1, 1]} />
      <meshBasicMaterial color="#ff8a4d" wireframe transparent opacity={0.18} />
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
              flatShading
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

      <ambientLight intensity={0.2} />
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
