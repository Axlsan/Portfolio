import animationPipeline from "@/assets/behance/animation-pipeline.png";
import backpack from "@/assets/behance/backpack.png";
import buildingDemo from "@/assets/behance/building-demo.jpeg";
import dometic from "@/assets/behance/dometic.png";
import oheOk from "@/assets/behance/ohe-ok.png";
import carGlass from "@/assets/behance/car-glass.png";
import unrealStudio from "@/assets/behance/unreal-studio.png";
import djiMavic from "@/assets/behance/dji-mavic.png";
import akareplatsen from "@/assets/behance/akareplatsen.png";

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
  link?: string;
};

export const projects: Project[] = [
  {
    id: "animation-pipeline",
    index: "01",
    title: "Animation Pipeline in Unreal Engine",
    category: "Realtime Pipeline",
    description:
      "End-to-end animation pipeline built inside Unreal Engine — covering rig import, sequencer staging, and render passes for cinematic output.",
    tags: ["Unreal Engine", "Animation", "Pipeline"],
    cover: animationPipeline,
    media: { type: "image", src: animationPipeline },
    span: "wide",
    link: "https://www.behance.net/gallery/225765435/Animation-Pipeline-in-Unreal-Engine",
  },
  {
    id: "backpack",
    index: "02",
    title: "Backpack Animation",
    category: "Realtime Animation",
    description:
      "Stylised backpack animation showcasing material work, lighting and sequenced camera moves in Unreal Engine.",
    tags: ["Unreal Engine", "Animation", "Lighting"],
    cover: backpack,
    media: { type: "image", src: backpack },
    link: "https://www.behance.net/gallery/226935767/Backpack-animation",
  },
  {
    id: "building-demo",
    index: "03",
    title: "Building Demo — Unreal Engine 5",
    category: "Architectural Realtime",
    description:
      "Architectural exterior built and lit in Unreal Engine 5, leveraging Lumen and Nanite for high-fidelity realtime visualisation.",
    tags: ["UE5", "Lumen", "Nanite", "Archviz"],
    cover: buildingDemo,
    media: { type: "image", src: buildingDemo },
    span: "tall",
    link: "https://www.behance.net/gallery/188994551/Building-Demo-Unreal-Engine-5",
  },
  {
    id: "dometic",
    index: "04",
    title: "Product Render — Dometic",
    category: "Product Visualisation",
    description:
      "Studio-grade product render developed for Dometic, focused on accurate materials, controlled lighting and presentation-ready composition.",
    tags: ["Product", "Render", "Studio"],
    cover: dometic,
    media: { type: "image", src: dometic },
    link: "https://www.behance.net/gallery/183064247/Product-Render-Dometic",
  },
  {
    id: "ohe-ok",
    index: "05",
    title: "Product Render — OHE-OK",
    category: "Product Visualisation",
    description:
      "Clean product visualisation for OHE-OK with a calibrated studio backdrop and tight focus on surface detail.",
    tags: ["Product", "Render", "Lighting"],
    cover: oheOk,
    media: { type: "image", src: oheOk },
    link: "https://www.behance.net/gallery/183057547/Product-Render-OHE-OK",
  },
  {
    id: "car-glass",
    index: "06",
    title: "Car Glass — Unreal Engine 4",
    category: "Realtime Shader",
    description:
      "Realtime automotive glass and paint study authored in Unreal Engine 4 — exploring refraction, reflections and clear-coat behaviour.",
    tags: ["UE4", "Materials", "Automotive"],
    cover: carGlass,
    media: { type: "image", src: carGlass },
    span: "wide",
    link: "https://www.behance.net/gallery/162555433/Car-Glass-Unreal-Engine-4",
  },
  {
    id: "unreal-studio",
    index: "07",
    title: "Unreal Project — Studio",
    category: "Realtime Scene",
    description:
      "A controlled studio environment built in Unreal — used as a sandbox for lighting setups, material calibration and turntable renders.",
    tags: ["Unreal", "Studio", "Lighting"],
    cover: unrealStudio,
    media: { type: "image", src: unrealStudio },
    link: "https://www.behance.net/gallery/161768385/Unreal-Project-Studio",
  },
  {
    id: "dji-mavic",
    index: "08",
    title: "Product Render — DJI Mavic 2 Pro",
    category: "Product Visualisation",
    description:
      "High-detail recreation and render of the DJI Mavic 2 Pro, focused on hard-surface modelling and presentation lighting.",
    tags: ["Product", "Hard-Surface", "Render"],
    cover: djiMavic,
    media: { type: "image", src: djiMavic },
    link: "https://www.behance.net/gallery/161114431/Product-Render-DJI-Mavic-2-Pro",
  },
  {
    id: "akareplatsen",
    index: "09",
    title: "Performance Modeling — Åkareplatsen",
    category: "Architectural Modeling",
    description:
      "Performance-focused architectural model of the Åkareplatsen building — optimised topology for realtime use without losing silhouette fidelity.",
    tags: ["Modeling", "Architecture", "Optimisation"],
    cover: akareplatsen,
    media: { type: "image", src: akareplatsen },
    span: "wide",
    link: "https://www.behance.net/gallery/161114009/Performance-Modeling-Akareplatsen-building",
  },
];
