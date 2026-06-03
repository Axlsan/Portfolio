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

export type ProjectSection = { heading: string; body: string };

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
  sections?: ProjectSection[];
};


export const projects: Project[] = [
  {
    id: "animation-pipeline",
    index: "01",
    title: "Animation Pipeline in Unreal Engine",
    category: "Realtime Pipeline",
    description:
      "A walkthrough of the parts that make up an animation pipeline built around Unreal Engine. Designed to be easy to follow for newcomers and scalable for larger teams — covering project management, folder structures, Perforce version control, Blender model prep, and post-production, with Notion and Trello tracking progress.",
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
      "Made shortly after joining AFRY Experience Studios as part of the in-house team. A first real product animation with moving parts, produced in 3ds Max and After Effects alongside the studio.",
    tags: ["3ds Max", "After Effects", "Animation"],
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
      "A blueprint built in Unreal Engine 5 that takes every component of a building and sends each one along a unique, randomised path to its final position — assembling itself into an animated construction sequence entirely inside Unreal.",
    tags: ["UE5", "Blueprints", "Archviz"],
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
      "CGI shots of various products from Dometic. Models prepped and textured in Blender.",
    tags: ["Blender", "Product", "Render"],
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
      "CGI shots and animation of an OHE-OK, with a hero shot of a GC from Timars. Models prepped, textured and rendered in Blender.",
    tags: ["Blender", "Product", "Animation"],
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
      "A material built in Unreal Engine 4 for a car simulator. Translucent windows were a performance hit, so the shader transitions from translucent to opaque using a dithering effect as the car moves away from the camera — and fills back in as it returns.",
    tags: ["UE4", "Materials", "Optimisation"],
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
      "An Unreal project built to test runtime mesh loading and material assignment, outputting rendered images on the fly. A plugin enables loading meshes at runtime, and any FBX can be imported and assigned materials per material-ID slot.",
    tags: ["Unreal", "Runtime", "FBX"],
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
      "CGI studio shots of a DJI Mavic 2 Pro. Modelled and textured in Blender, with post-processing finished in Photoshop.",
    tags: ["Blender", "Photoshop", "Product"],
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
      "A recreation of a building from Åkareplatsen. Photography and Google Maps were used to gather measurements and reference textures. The building was topologised and UV-mapped in 3ds Max, then shaded in Unreal Engine with trim textures.",
    tags: ["3ds Max", "Unreal", "Trim Sheets"],
    cover: akareplatsen,
    media: { type: "image", src: akareplatsen },
    span: "wide",
    link: "https://www.behance.net/gallery/161114009/Performance-Modeling-Akareplatsen-building",
  },

];
