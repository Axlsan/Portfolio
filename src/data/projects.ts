import workTerrain from "@/assets/work-terrain.jpg";
import workShader from "@/assets/work-shader.jpg";
import workParticles from "@/assets/work-particles.jpg";
import workSculpt from "@/assets/work-sculpt.jpg";
import workTopology from "@/assets/work-topology.jpg";
import workWater from "@/assets/work-water.jpg";

export type ProjectMedia =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster: string }
  | { type: "model"; variant: "torus" | "knot" | "crystal" };

export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  cover: string;
  media: ProjectMedia;
  span?: "wide" | "tall" | "regular";
};

export const projects: Project[] = [
  {
    id: "magma",
    index: "01",
    title: "Magma Terrain System",
    category: "Realtime Shader",
    description:
      "Procedural lava terrain with multi-octave noise displacement, emissive crack masking, and a custom heat-haze post pass. Authored in HLSL for a Unity URP target running at 4K/60.",
    tags: ["HLSL", "URP", "Procedural", "Post FX"],
    cover: workTerrain,
    media: { type: "image", src: workTerrain },
    span: "wide",
  },
  {
    id: "iris",
    index: "02",
    title: "Iris — Thin Film",
    category: "PBR Material Study",
    description:
      "Physically-based thin-film interference shader exploring the Fresnel-weighted layer thickness model, written from scratch in GLSL.",
    tags: ["GLSL", "PBR", "Optics"],
    cover: workShader,
    media: { type: "model", variant: "crystal" },
  },
  {
    id: "ember",
    index: "03",
    title: "Ember — Particle Sim",
    category: "VFX",
    description:
      "Houdini-authored ember and smoke simulation, baked to Vertex Animation Texture for realtime playback with no runtime cost.",
    tags: ["Houdini", "VAT", "VFX"],
    cover: workParticles,
    media: { type: "image", src: workParticles },
  },
  {
    id: "atlas",
    index: "04",
    title: "Atlas — Hero Sculpt",
    category: "Character Pipeline",
    description:
      "End-to-end pipeline from a 12M-tri ZBrush sculpt to a 28k LOD0 game-ready asset, including custom retopo bake and material setup.",
    tags: ["ZBrush", "Retopo", "Bake"],
    cover: workSculpt,
    media: { type: "model", variant: "torus" },
    span: "tall",
  },
  {
    id: "topo",
    index: "05",
    title: "Topology Studies",
    category: "Modeling Research",
    description:
      "Series exploring optimal edge-flow strategies for procedurally generated terrain, with quad-dominant remeshing and curvature analysis.",
    tags: ["Topology", "Geometry", "Research"],
    cover: workTopology,
    media: { type: "model", variant: "knot" },
  },
  {
    id: "tide",
    index: "06",
    title: "Tide — Ocean Shader",
    category: "Realtime Shader",
    description:
      "Cinematic ocean shader with Gerstner waves, screen-space refractions, and a custom horizon-fade for performant skyboxes.",
    tags: ["Shader", "Gerstner", "SSR"],
    cover: workWater,
    media: { type: "image", src: workWater },
    span: "wide",
  },
];
