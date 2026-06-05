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
    id: "animation-pipeline",
    index: "01",
    title: "Animation Pipeline in Unreal Engine",
    category: "Realtime Pipeline",
    description:
      "A walkthrough of the parts that make up an animation pipeline built around Unreal Engine. Designed to be easy to approach for newcomers and scalable for larger teams.",
    tags: ["Unreal Engine", "Animation", "Pipeline"],
    cover: animationPipeline,
    media: { type: "image", src: animationPipeline },
    span: "wide",
    link: "https://www.behance.net/gallery/225765435/Animation-Pipeline-in-Unreal-Engine",
    blocks: [
      { type: "text", body: "This is a walkthrough of the various parts that are necessary for an animation pipeline that utilizes Unreal Engine. There are many ways to achieve the same results, but I've worked towards making it easy to approach — even for the inexperienced user — and also applicable for larger teams." },

      { type: "heading", body: "Project management and IT" },
      { type: "text", body: "For any project of this size there are some prerequisites to complete which leverage the production." },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/609595225765435.68259759b153a.png" },
      { type: "text", body: "Having a folder structure that helps separate work files, renders and deliverables enables teamwork and isolates production into manageable chunks." },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/77d6f1225765435.68259759b273f.png" },
      { type: "text", body: "Perforce is a powerful tool for any Unreal project. It enables revision control, which means users can collaborate and track changes in the project. Setting up a virtual machine to run the Perforce server lets all users access the project at all times." },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/265836225765435.6825b57fc036b.png" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/8dfeec225765435.6825b57fc085c.png" },
      { type: "text", body: "Progress is tracked using tools like Trello or Notion. Establishing a workflow with key tasks, defined timelines for reviews and checkpoints, and clear goals helps keep projects of any size on track." },

      { type: "heading", body: "Model preparation" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/3d0dcb225765435.6825b5803641e.png" },
      { type: "text", body: "For this pipeline, Blender is used to take full control of the transition from preparation to Unreal. The geometry is prepared in several ways, as described below:" },

      { type: "heading", body: "1. Fixing mesh geometry (normals and edges)" },
      { type: "text", body: "Normals — help with how light hits the surface. Fixing them ensures proper lighting and smooth shading on the model.\n\nEdges — fixing edges makes sure everything lines up neatly and looks clean, avoiding jagged or blocky areas." },

      { type: "heading", body: "2. Setting up materials and UV mapping" },
      { type: "text", body: "Materials — define the look of the model (like making it look like wood, metal, or glass) by controlling texture, colour, and reflectivity.\n\nUV mapping — \"unwraps\" the model into a flat surface, allowing textures to fit perfectly without stretching." },

      { type: "heading", body: "3. Rigging the models with a skeleton" },
      { type: "text", body: "Rigging — gives the model a skeleton that lets you pose and animate it, like how you'd move a puppet.\n\nSkeleton — made of bones that control the movement of different parts of the model, allowing for realistic animation." },

      { type: "heading", body: "Scene building, animation and rendering" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/efe37b225765435.6826f13248687.png" },
      { type: "text", body: "Unreal Engine is a widely-used tool, primarily in the gaming industry, but also in animation and visualisations. It's convenient because it's so well-known, with many users and resources available. There can be some challenges to achieving top-tier visual quality, as the engine is primarily made for realtime rendering." },

      { type: "heading", body: "1. Model setup" },
      { type: "text", body: "The first step in preparing everything for the scene — making sure assets are properly configured for later stages.\n\nMaterials — the foundation of how an object looks. Materials define the texture, colour and behaviour of a surface when it interacts with light.\n\nControl Rigs — a tool for animating characters or objects. Setting up a control rig makes it easier to pose and animate models, especially for character animation.\n\nBlueprints for smart control — Unreal's Blueprint system allows you to create visual scripts for controlling materials, lighting and more, managing multiple aspects with a single control system." },

      { type: "heading", body: "2. Scene building" },
      { type: "text", body: "Once your models are set up, the next step is building the environment around them — where the virtual world starts to come to life.\n\nEnvironment setup — creating and placing assets like terrain, architecture, props and any other 3D elements that make up the environment.\n\nLighting configuration — crucial to setting the mood and realism of the scene. Choosing light sources, their properties (intensity and colour), and ensuring proper shadows and reflections for a natural or stylised effect." },

      { type: "heading", body: "3. Animation" },
      { type: "text", body: "At this stage, you add motion and life to your models and environment.\n\nBlueprint usage for animation — Unreal's Blueprint system is often used to drive animations. For example, triggering a character's walk cycle based on player input or an environmental change creates dynamic, interactive experiences.\n\nReusable motion — animation assets that can be reused across different models or characters. A walk cycle created for one character can be applied to others, saving time and maintaining consistency." },

      { type: "heading", body: "4. Rendering" },
      { type: "text", body: "Finally, after building and animating the scene, it's time to render everything.\n\nRender presets and console variables — predefined settings that control how the scene is rendered (quality, resolution, performance). Console variables allow you to fine-tune render settings, ensuring the scene looks its best and performs efficiently.\n\nLayer management — lets you organise the scene for more control in post. You might separate the background, characters and foreground into distinct layers for easier compositing or applying effects.\n\nOutput path setup — defines where rendered files will be saved, keeping final frames organised for use or further processing." },

      { type: "heading", body: "Post processing" },
      { type: "image", src: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/e5fa36225765435.6826ede70a867.png" },
      { type: "text", body: "In this production, layers were used to mask materials and objects to easily edit elements in the scene independently in After Effects. Each scene was edited separately and then combined with text." },
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
