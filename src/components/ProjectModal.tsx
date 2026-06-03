import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, RotateCw } from "lucide-react";
import type { Project } from "@/data/projects";
import { ModelViewer } from "./ModelViewer";

export const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) => {
  const [wireframe, setWireframe] = useState(false);

  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [project, onClose]);

  if (!project) return null;
  const hasBlocks = !!project.blocks && project.blocks.length > 0;

  const Media = (
    <>
      {project.media.type === "image" && (
        <img
          src={project.media.src}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {project.media.type === "video" && (
        <video
          src={project.media.src}
          poster={project.media.poster}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {project.media.type === "model" && (
        <>
          <ModelViewer variant={project.media.variant} wireframe={wireframe} />
          <div className="absolute bottom-4 left-4 flex items-center gap-2 mono-font text-[10px] uppercase tracking-[0.25em]">
            <button
              onClick={() => setWireframe((w) => !w)}
              className={`px-3 py-2 border transition-colors ${
                wireframe
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-foreground/70 hover:text-primary hover:border-primary"
              }`}
            >
              Wireframe
            </button>
            <span className="px-3 py-2 border border-border text-foreground/50 flex items-center gap-2">
              <RotateCw size={10} /> drag to orbit
            </span>
          </div>
        </>
      )}
    </>
  );

  const Stack = (
    <>
      <div className="ticker-line mb-4" />
      <div className="hud-label mb-3">Stack</div>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span
            key={t}
            className="mono-font text-[11px] uppercase tracking-widest text-foreground/80 border border-border px-3 py-1.5"
          >
            {t}
          </span>
        ))}
      </div>
    </>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.83, 0, 0.17, 1] }}
          onClick={(e) => e.stopPropagation()}
          className={`absolute inset-4 md:inset-8 lg:inset-12 bg-surface-1 border border-border overflow-hidden ${
            hasBlocks ? "flex flex-col" : "flex flex-col lg:flex-row"
          }`}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-background/80 border border-border hover:border-primary hover:text-primary transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          {hasBlocks ? (
            // Vertical scrollable layout: splash on top, article below
            <div className="flex-1 overflow-y-auto">
              {/* Splash */}
              <div className="relative w-full h-[60vh] bg-background">
                {Media}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface-1 to-transparent pointer-events-none" />
              </div>

              {/* Article */}
              <div className="mx-auto max-w-3xl px-6 md:px-10 py-10 md:py-16">
                <div className="hud-label mb-3">/{project.index} · {project.category}</div>
                <h2 className="display-font text-4xl md:text-6xl mb-6 leading-none">
                  {project.title}
                </h2>
                <p className="serif-font text-lg md:text-xl text-foreground/80 italic mb-10 leading-snug">
                  {project.description}
                </p>

                <div className="space-y-8">
                  {project.blocks!.map((b, i) => {
                    if (b.type === "heading") {
                      return (
                        <h3
                          key={i}
                          className="display-font text-2xl md:text-3xl text-primary leading-tight pt-4"
                        >
                          {b.body}
                        </h3>
                      );
                    }
                    if (b.type === "text") {
                      return (
                        <p
                          key={i}
                          className="serif-font text-[17px] md:text-lg text-foreground/85 leading-relaxed whitespace-pre-line"
                        >
                          {b.body}
                        </p>
                      );
                    }
                    return (
                      <figure key={i} className="my-4">
                        <img
                          src={b.src}
                          alt={b.alt ?? ""}
                          loading="lazy"
                          className="w-full h-auto border border-border bg-background"
                        />
                      </figure>
                    );
                  })}
                </div>

                <div className="mt-16">{Stack}</div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono-font text-[11px] uppercase tracking-widest inline-block mt-8 border border-border px-4 py-2 hover:border-primary hover:text-primary transition-colors"
                  >
                    View on Behance ↗
                  </a>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Media */}
              <div className="relative flex-1 bg-background min-h-[280px] lg:min-h-0">{Media}</div>

              {/* Side panel */}
              <div className="lg:w-[480px] lg:flex-shrink-0 border-t lg:border-t-0 lg:border-l border-border p-6 md:p-8 overflow-y-auto bg-surface-1">
                <div className="hud-label mb-3">/{project.index} · {project.category}</div>
                <h2 className="display-font text-4xl md:text-5xl mb-6 leading-none">
                  {project.title}
                </h2>

                <p className="serif-font text-lg text-foreground/80 italic mb-8 leading-snug">
                  {project.description}
                </p>

                {project.sections && project.sections.length > 0 && (
                  <div className="space-y-6 mb-8">
                    {project.sections.map((s) => (
                      <div key={s.heading}>
                        <div className="hud-label mb-2 text-primary">{s.heading}</div>
                        <div className="serif-font text-[15px] text-foreground/80 leading-relaxed whitespace-pre-line">
                          {s.body}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-4 mb-8">
                  <Row k="Format" v={project.media.type.toUpperCase()} />
                </div>

                {Stack}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-3">
    <span className="hud-label">{k}</span>
    <span className="mono-font text-sm text-foreground">{v}</span>
  </div>
);
