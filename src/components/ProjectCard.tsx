import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

export const ProjectCard = ({
  project,
  onOpen,
  index,
}: {
  project: Project;
  onOpen: (p: Project) => void;
  index: number;
}) => {
  const spanClass =
    project.span === "wide"
      ? "md:col-span-8"
      : project.span === "tall"
      ? "md:col-span-4 md:row-span-2"
      : "md:col-span-4";

  const heightClass = project.span === "tall" ? "h-[640px]" : "h-[360px] md:h-[440px]";

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(project)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.83, 0, 0.17, 1] }}
      className={`group relative overflow-hidden bg-surface-1 text-left ${spanClass} ${heightClass} border border-border hover:border-primary/40 transition-colors duration-500`}
    >
      <img
        src={project.cover}
        alt={project.title}
        loading="lazy"
        width={1280}
        height={896}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
      {/* Top HUD */}
      <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-5">
        <span className="mono-font text-[10px] uppercase tracking-[0.25em] text-foreground/70">
          /{project.index}
        </span>
        <span className="mono-font text-[10px] uppercase tracking-[0.25em] text-foreground/70">
          {project.media.type === "model" ? "● 3D MODEL" : project.media.type === "video" ? "▶ REEL" : "◐ STILL"}
        </span>
      </div>
      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <div className="hud-label mb-2">{project.category} · {project.year}</div>
        <h3 className="display-font text-3xl md:text-4xl text-foreground leading-none mb-3">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="mono-font text-[10px] uppercase tracking-widest text-foreground/60 border border-border/60 px-2 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      {/* Hover ember */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-radial-glow pointer-events-none" />
    </motion.button>
  );
};
