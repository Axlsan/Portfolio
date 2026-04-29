import { Suspense, lazy, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectModal } from "@/components/ProjectModal";

const HeroScene = lazy(() =>
  import("@/components/HeroScene").then((m) => ({ default: m.HeroScene }))
);

const Index = () => {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* === NAV === */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className="flex items-center justify-between px-8 md:px-16 py-4">
          <a href="#top" className="flex items-center gap-3">
            <span className="w-2 h-2 bg-primary animate-pulse-ember" />
            <span className="display-font text-sm tracking-tight">KAI / FORGE</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 mono-font text-[11px] uppercase tracking-[0.25em]">
            <a href="#work" className="hover:text-primary transition-colors">Work</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </nav>
          <a
            href="#contact"
            className="mono-font text-[11px] uppercase tracking-[0.25em] border border-border hover:border-primary hover:text-primary px-4 py-2 transition-colors"
          >
            Available Q3 →
          </a>
        </div>
      </header>

      {/* === HERO === */}
      <section id="top" className="relative pt-24 pb-12 px-8 md:px-16">
        <div className="relative h-[80vh] w-full overflow-hidden grain-overlay border border-border">
          <div className="absolute inset-0">
            <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
              <HeroScene />
            </Suspense>
          </div>

          {/* gradient veil */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none" />

          {/* Hero copy */}
          <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 pb-12 md:pb-16 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
              className="max-w-5xl"
            >
              <div className="hud-label mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-primary" />
                Technical Artist · Berlin / Remote
              </div>
              <h1 className="display-font text-[clamp(2.5rem,8vw,8rem)] leading-[0.85]">
                FORGING<br />
                <span className="serif-font italic font-normal text-primary">realtime</span> WORLDS
              </h1>
              <p className="mt-6 max-w-xl serif-font italic text-lg md:text-xl text-foreground/80 leading-snug">
                Shaders, simulation pipelines and tooling for studios that ship.
                Eight years between the artist and the engine.
              </p>
            </motion.div>
          </div>

          {/* HUD corners */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
            <span className="mono-font text-[9px] uppercase tracking-[0.2em] text-foreground/60 border border-border/60 bg-background/40 backdrop-blur-sm px-2 py-1">
              /001 — index
            </span>
          </div>
          <div className="absolute top-4 right-4 md:top-6 md:right-6 mono-font text-[10px] uppercase tracking-[0.25em] text-foreground/50 z-10 text-right">
            rt: 60fps<br />pass: forward+
          </div>
          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 mono-font text-[10px] uppercase tracking-[0.25em] text-foreground/50 z-10">
            scroll ↓
          </div>
        </div>
      </section>

      {/* === MARQUEE === */}
      <section className="border-y border-border bg-surface-1 py-5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap mono-font text-sm uppercase tracking-[0.3em]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10 mr-10 text-foreground/60">
              <span>HLSL</span><span className="text-primary">●</span>
              <span>Houdini</span><span className="text-primary">●</span>
              <span>Unreal Engine 5</span><span className="text-primary">●</span>
              <span>Substance</span><span className="text-primary">●</span>
              <span>Three.js</span><span className="text-primary">●</span>
              <span>Python Tooling</span><span className="text-primary">●</span>
              <span>Vertex Animation</span><span className="text-primary">●</span>
            </div>
          ))}
        </div>
      </section>

      {/* === WORK === */}
      <section id="work" className="px-8 md:px-16 py-24 md:py-32 relative">
        <div className="flex items-end justify-between mb-12 md:mb-20">
          <div>
            <div className="hud-label mb-4">/002 — selected work</div>
            <h2 className="display-font text-5xl md:text-7xl leading-none">
              Recent<br />
              <span className="serif-font italic font-normal text-primary">artifacts.</span>
            </h2>
          </div>
          <div className="hidden md:block hud-value text-right text-foreground/60 max-w-xs">
            {projects.length.toString().padStart(2, "0")} projects · 2023—2024<br />
            click any tile to inspect
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-3 md:gap-4 auto-rows-auto">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={setActive} />
          ))}
        </div>
      </section>

      {/* === ABOUT === */}
      <section id="about" className="border-t border-border bg-surface-1 px-8 md:px-16 py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4">
            <div className="hud-label mb-4">/003 — bio</div>
            <h2 className="display-font text-4xl md:text-5xl leading-none">
              Half<br />
              <span className="serif-font italic font-normal text-primary">artist,</span><br />
              half<br />
              <span className="serif-font italic font-normal text-primary">compiler.</span>
            </h2>
          </div>
          <div className="md:col-span-8 md:pl-12 space-y-6">
            <p className="serif-font text-2xl md:text-3xl leading-snug text-foreground/90">
              I build the bridge between art direction and the GPU. From procedural
              terrain systems to character-pipeline tooling, my work lives where
              creative ambition meets frame-budget reality.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-border">
              <Stat k="Years" v="08" />
              <Stat k="Studios" v="11" />
              <Stat k="Shipped" v="24" />
              <Stat k="Coffee/day" v="∞" />
            </div>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <div className="hud-label mb-3">Disciplines</div>
                <ul className="mono-font text-sm space-y-1.5 text-foreground/80">
                  <li>— Realtime shader authoring (HLSL / GLSL)</li>
                  <li>— FX & simulation (Houdini, EmberGen)</li>
                  <li>— Character & asset pipelines</li>
                  <li>— DCC tooling (Python, MaxScript)</li>
                </ul>
              </div>
              <div>
                <div className="hud-label mb-3">Engines</div>
                <ul className="mono-font text-sm space-y-1.5 text-foreground/80">
                  <li>— Unreal Engine 5 (Niagara, MaterialX)</li>
                  <li>— Unity URP / HDRP</li>
                  <li>— Three.js / WebGL custom</li>
                  <li>— Bespoke renderers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === CONTACT === */}
      <section id="contact" className="relative px-8 md:px-16 py-32 md:py-44 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial-glow opacity-60 pointer-events-none" />
        <div className="relative max-w-5xl">
          <div className="hud-label mb-6">/004 — contact</div>
          <h2 className="display-font text-[clamp(3rem,9vw,9rem)] leading-[0.85]">
            Let's<br />
            <span className="serif-font italic font-normal text-primary">make</span> something<br />
            molten.
          </h2>
          <div className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-8 max-w-3xl">
            <a
              href="mailto:hello@kaiforge.studio"
              className="group inline-flex items-baseline gap-3 mono-font text-2xl md:text-4xl text-foreground hover:text-primary transition-colors"
            >
              hello@kaiforge.studio
              <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <div className="flex gap-6 mono-font text-[11px] uppercase tracking-[0.25em]">
              <a href="#" className="hover:text-primary transition-colors">Artstation ↗</a>
              <a href="#" className="hover:text-primary transition-colors">GitHub ↗</a>
              <a href="#" className="hover:text-primary transition-colors">LinkedIn ↗</a>
            </div>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="border-t border-border px-8 md:px-16 py-6 flex flex-col md:flex-row justify-between gap-3 mono-font text-[10px] uppercase tracking-[0.25em] text-foreground/50">
        <span>© 2024 Kai Forge — built in three.js</span>
        <span>v1.4.2 · last forged 2024.06</span>
      </footer>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>
  );
};

const Stat = ({ k, v }: { k: string; v: string }) => (
  <div>
    <div className="display-font text-4xl text-primary leading-none">{v}</div>
    <div className="hud-label mt-2">{k}</div>
  </div>
);

export default Index;
