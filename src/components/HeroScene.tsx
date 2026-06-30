import { Component, ReactNode, Suspense, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Sparkles, useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";

class ModelErrorBoundary extends Component<{ fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: { fallback: ReactNode }) {
    if (prevProps.fallback !== this.props.fallback && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

const GltfCharacter = ({
  modelUrl,
  modelScale = 1,
}: {
  modelUrl: string;
  modelScale?: number;
}) => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(modelUrl);
  const { actions } = useAnimations(animations, group);
  const modelScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    const action = actions[animations[0]?.name ?? ""];
    if (action) {
      action.reset();
      action.play();
    }
  }, [actions, animations]);

  useFrame((state) => {
    if (!group.current) return;

    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 8) * 0.04;
    group.current.position.z = 0.15 + Math.sin(t * 16) * 0.01;
    group.current.rotation.y = -0.75 + Math.sin(t * 8) * 0.08;
    group.current.rotation.x = 0.12 + Math.sin(t * 12) * 0.02;
    group.current.rotation.z = 0.03 * Math.sin(t * 6);
  });

  return (
    <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.2}>
      <group ref={group} scale={modelScale} position={[0, -40, 0.15]} rotation={[0, -2.1468, 0]}>
        <primitive object={modelScene} />
      </group>
    </Float>
  );
};

const WavingMan = () => (
  <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.2}>
    <group position={[0, -0.9, 0]} rotation={[0, -0.75, 0]}>
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#f2d4b7" />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.5, 12]} />
        <meshStandardMaterial color="#2a2a3a" />
      </mesh>
      <mesh position={[-0.18, 0.05, 0]} rotation={[0, 0, 0.35]}>
        <cylinderGeometry args={[0.05, 0.05, 0.35, 12]} />
        <meshStandardMaterial color="#f2d4b7" />
      </mesh>
      <mesh position={[0.18, 0.05, 0]} rotation={[0, 0, -0.35]}>
        <cylinderGeometry args={[0.05, 0.05, 0.35, 12]} />
        <meshStandardMaterial color="#f2d4b7" />
      </mesh>
    </group>
  </Float>
);

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

export const HeroScene = ({
  modelUrl = "models/PorfolioGuy.glb",
  modelScale = 1,
}: {
  modelUrl?: string;
  modelScale?: number;
}) => {
  const resolvedModelUrl = useMemo(() => {
    if (!modelUrl) return "";
    if (/^https?:\/\//.test(modelUrl)) return modelUrl;
    return `${import.meta.env.BASE_URL}${modelUrl.replace(/^\//, "")}`;
  }, [modelUrl]);

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

      {resolvedModelUrl ? (
        <ModelErrorBoundary fallback={<WavingMan />}>
          <Suspense fallback={<WavingMan />}>
            <GltfCharacter modelUrl={resolvedModelUrl} modelScale={modelScale} />
          </Suspense>
        </ModelErrorBoundary>
      ) : (
        <WavingMan />
      )}
      <Shell />
      <FloatingShards />

      <Sparkles count={60} scale={8} size={2} speed={0.3} color="#ffaa66" />

      <Environment preset="sunset" />
    </Canvas>
  );
};
