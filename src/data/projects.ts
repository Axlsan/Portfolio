import animationPipeline from "@/assets/behance/animation-pipeline.png";
import backpack from "@/assets/behance/backpack.png";
import buildingDemo from "@/assets/behance/building-demo.jpeg";
import dometic from "@/assets/behance/dometic.png";
import oheOk from "@/assets/behance/ohe-ok.png";
import carGlass from "@/assets/behance/car-glass.png";
import unrealStudio from "@/assets/behance/unreal-studio.png";
import djiMavic from "@/assets/behance/dji-mavic.png";
import akareplatsen from "@/assets/behance/akareplatsen.png";
import gravidrift from "@/assets/behance/gravidrift.png";
import building1 from "@/assets/behance/building/b1.webp";
import studio1 from "@/assets/behance/studio/s1.webp";
import studio2 from "@/assets/behance/studio/s2.webp";
import studio3 from "@/assets/behance/studio/s3.webp";
import studio4 from "@/assets/behance/studio/s4.webp";
import studio5 from "@/assets/behance/studio/s5.webp";
import studio6 from "@/assets/behance/studio/s6.webp";
import studio7 from "@/assets/behance/studio/s7.webp";
import dometic1 from "@/assets/behance/dometic/d1.png";
import dometic2 from "@/assets/behance/dometic/d2.png";
import dometic3 from "@/assets/behance/dometic/d3.png";
import oheok1 from "@/assets/behance/oheok/o1.png";
import oheok2 from "@/assets/behance/oheok/o2.png";
import oheok3 from "@/assets/behance/oheok/o3.png";
import carglass1 from "@/assets/behance/carglass/c1.png";
import carglass2 from "@/assets/behance/carglass/c2.png";
import carglass3 from "@/assets/behance/carglass/c3.png";
import carglass4 from "@/assets/behance/carglass/c4.png";
import carglass5 from "@/assets/behance/carglass/c5.png";
import carglass6 from "@/assets/behance/carglass/c6.png";
import carglass7 from "@/assets/behance/carglass/c7.png";
import mavic1 from "@/assets/behance/mavic/m1.jpg";
import mavic2 from "@/assets/behance/mavic/m2.jpg";
import akare1 from "@/assets/behance/akare/a1.png";
import akare2 from "@/assets/behance/akare/a2.png";
import akare3 from "@/assets/behance/akare/a3.png";
import akare4 from "@/assets/behance/akare/a4.png";
import akare5 from "@/assets/behance/akare/a5.png";
import akare6 from "@/assets/behance/akare/a6.png";
import akare7 from "@/assets/behance/akare/a7.png";
import akare8 from "@/assets/behance/akare/a8.png";
import akare9 from "@/assets/behance/akare/a9.png";

export type ProjectMedia =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster: string }
  | { type: "model"; variant: "torus" | "knot" | "crystal" };

export type ProjectSection = { heading: string; body: string };

export type ProjectBlock =
  | { type: "heading"; body: string }
  | { type: "text"; body: string }
  | { type: "image"; src: string; alt?: string };

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
  blocks?: ProjectBlock[];
};



export const projects: Project[] = [
  {
    id: "gravidrift",
    index: "01",
    title: "GraviDrift",
    category: "Game",
    description:
      "A small indie mobile arcade game made by a team of four in their free time — fly through deep space, dodge obstacles and chase the highest score. Built in Unreal Engine and released on Google Play.",
    tags: ["Unreal Engine", "Mobile", "Game Design"],
    cover: gravidrift,
    media: { type: "image", src: gravidrift },
    span: "wide",
    link: "https://play.google.com/store/apps/details?id=com.ThreeDLFGStudios.GraviDrift&hl=sv",
    blocks: [
      { type: "text", body: "GraviDrift is a small indie game created by a team of four passionate developers in their free time." },
      { type: "text", body: "Fly through deep space and dodge obstacles as you push your reflexes to the limit. Your goal: go as fast as possible and chase the highest score!" },
      { type: "text", body: "Featuring fast-paced movement, tight controls, and procedurally placed obstacles, GraviDrift challenges you to master drifting through narrow gaps and reacting in split-second situations." },
      { type: "text", body: "Whether you're looking for a quick arcade challenge or a skill-based speedrun experience, GraviDrift offers endless replayability and a pure focus on fun movement." },
      { type: "heading", body: "Key Features" },
      { type: "text", body: "• Free flight\n• Fast and responsive movement\n• Score-based progression and replay value\n• Lightweight build, no ads, no online connection required\n• Made entirely by a small indie team with love" },
      { type: "text", body: "Can you handle the drift?" },
      { type: "image", src: gravidrift, alt: "GraviDrift in-game screenshot" },
    ],
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
    blocks: [
      { type: "text", body: "When I first joined AFRY Experience Studios as part of the in-house studio, I worked alongside the team to create this product animation. It was my first real animation with moving parts." },
      { type: "image", src: backpack, alt: "Backpack animation still frame" },
    ],
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
    blocks: [
      { type: "heading", body: "Animated building construction in Unreal" },
      { type: "text", body: "This is a demo of a blueprint I created that takes all the building's components and sends each one along a unique, randomized path to its final position." },
      { type: "text", body: "This house was built using a blueprint child class that inherits all the core features from a parent building class. This setup allows other buildings to easily reuse the same functionality." },
      { type: "text", body: "The main goal was to automate the entire construction process, removing the need to animate each part by hand. Each building component is handled by a separate FlyingComponent blueprint class, which manages the component's movement during construction. I've set up groups to allow components to be placed in a prioritized order." },
      { type: "text", body: "You can inspect the Blueprints here: https://blueprintue.com/profile/axlsan/" },
      { type: "image", src: building1, alt: "Construction process with visualized paths for each component" },
      { type: "text", body: "Construction process with visualized paths for each component." },
    ],
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
    blocks: [
      { type: "heading", body: "Product Renders" },
      { type: "text", body: "CGI shots of various products from Dometic." },
      { type: "text", body: "The models are prepped and textured in Blender." },
      { type: "image", src: dometic1, alt: "Dometic product render" },
      { type: "image", src: dometic2, alt: "Dometic product render" },
      { type: "image", src: dometic3, alt: "Dometic product render" },
    ],
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
    blocks: [
      { type: "heading", body: "OHE & GC" },
      { type: "text", body: "CGI shots and animation of a OHE-OK with a hero shot of a GC from Timars." },
      { type: "text", body: "The models are prepped, textured and rendered in Blender." },
      { type: "image", src: oheok1, alt: "OHE-OK render" },
      { type: "image", src: oheok2, alt: "OHE-OK render" },
      { type: "image", src: oheok3, alt: "GC hero shot" },
    ],
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
    blocks: [
      { type: "heading", body: "CarGlass" },
      { type: "text", body: "This is a material I made in Unreal Engine 4 for a car simulator. The transparent windows were very expensive and had to be optimised. As the car moves away from the camera, the windows change from translucent material to opaque with a dithering effect. The windows then fill in as the windows goes even further." },
      { type: "image", src: carglass1, alt: "Car with translucent windows up close" },
      { type: "image", src: carglass2, alt: "Translucent window detail" },
      { type: "text", body: "Here is the same car at a distance, here the windows are much cheaper to draw while they still seem to be transparent." },
      { type: "image", src: carglass3, alt: "Car at distance with optimised windows" },
      { type: "image", src: carglass4, alt: "Dithered transition step" },
      { type: "image", src: carglass5, alt: "Dithered transition step" },
      { type: "image", src: carglass6, alt: "Opaque fill step" },
      { type: "text", body: "Here is the material graph:" },
      { type: "image", src: carglass7, alt: "Material graph in Unreal Engine 4" },
    ],
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
    blocks: [
      { type: "heading", body: "Studio" },
      { type: "text", body: "This Unreal Engine project Is meant to test the ability to load and set materials to meshes at runtime and finally output rendered images." },
      { type: "text", body: "The project uses a plugin that enables loading meshes at runtime that would not be possible otherwise." },
      { type: "image", src: studio1, alt: "Studio scene render" },
      { type: "text", body: "I prepared two models in Blender. By default the application imports any FBX file." },
      { type: "image", src: studio2, alt: "Imported FBX models" },
      { type: "text", body: "The application uses a simple set of predetermined materials." },
      { type: "image", src: studio3, alt: "Predetermined materials" },
      { type: "text", body: "Different materials can be set to each material ID slot on the object." },
      { type: "image", src: studio4, alt: "Material ID slots" },
      { type: "text", body: "An example of a more detailed object:" },
      { type: "image", src: studio5, alt: "Detailed object example" },
      { type: "image", src: studio6, alt: "Studio configurator render" },
      { type: "text", body: "The output:" },
      { type: "image", src: studio7, alt: "Final rendered output" },
    ],
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
    blocks: [
      { type: "heading", body: "DJI Mavic 2 Pro" },
      { type: "text", body: "CGI studio shots of a DJI Mavic 2 Pro." },
      { type: "text", body: "I have prepped and textured the model and I did the post process in Photoshop." },
      { type: "image", src: mavic1, alt: "DJI Mavic 2 Pro studio render" },
      { type: "image", src: mavic2, alt: "DJI Mavic 2 Pro studio render" },
    ],
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
    blocks: [
      { type: "heading", body: "Åkareplatsen building" },
      { type: "text", body: "Here is the process of making a building from Åkareplatsen. For preparation I used photography and Google maps to get the right measurements and textures. The building is topologized and UV mapped in 3DS Max and shaded in Unreal Engine with trim textures." },
      { type: "image", src: akare1, alt: "Åkareplatsen reference and modeling" },
      { type: "image", src: akare2, alt: "Modeling stage" },
      { type: "image", src: akare3, alt: "Modeling stage" },
      { type: "text", body: "The building is textured in Unreal Engine with three trim textures. They are used to create seven different looks on various parts of the building. This lowers performance impact greatly as Unreal Engine only has to process one shader instead of seven." },
      { type: "image", src: akare4, alt: "Trim texture breakdown" },
      { type: "image", src: akare5, alt: "Trim texture breakdown" },
      { type: "image", src: akare6, alt: "Trim texture breakdown" },
      { type: "image", src: akare7, alt: "Final shaded building" },
      { type: "image", src: akare8, alt: "Final shaded building" },
      { type: "image", src: akare9, alt: "Final shaded building" },
    ],
  },

];
