import { ArrowUpRight } from "lucide-react";
import { SectionHead, StatusTag } from "./system";
import { projects } from "../data/portfolio";

function Projects() {
  return (
    <section id="projetos" className="relative py-24 sm:py-32">
      {/* periferia rotacionada — linguagem do hero */}
      <p
        aria-hidden="true"
        className="absolute top-1/2 -left-9 hidden -translate-y-1/2 rotate-180 font-mono text-[0.62rem] tracking-[0.32em] text-faint uppercase [writing-mode:vertical-rl] xl:block"
      >
        ls ~/portfolio/projetos — 03 módulos
      </p>

      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          index="01"
          path="projetos"
          title="Projetos"
          blurb="Módulos de software construídos de ponta a ponta — do schema do banco ao deploy."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {projects.map((p) => {
            const num = p.id.split("-")[1];
            return (
              <article
                key={p.id}
                className="group relative flex h-full cursor-pointer flex-col border border-line bg-panel transition-colors duration-200 hover:border-line-strong"
              >
                {/* número do módulo como marca d'água estrutural */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-3 right-4 font-mono text-[4.5rem] leading-none font-semibold text-line select-none transition-colors duration-200 group-hover:text-line-strong"
                >
                  {num}
                </span>

                {/* cabeçalho do módulo */}
                <div className="relative flex items-center justify-between gap-3 border-b border-line px-5 py-3">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-faint uppercase">
                    <span className="font-medium text-signal">{p.id}</span>
                    <span className="mx-2 text-line-strong">·</span>
                    {p.type}
                  </span>
                  <StatusTag label={p.status.label} state={p.status.state} />
                </div>

                {p.image && (
                  <div className="relative overflow-hidden border-b border-line">
                    <img
                      src={p.image}
                      alt={`Interface do projeto ${p.title}`}
                      loading="lazy"
                      className="aspect-[21/9] w-full max-w-full object-cover object-top transition-transform duration-200 group-hover:scale-[1.015]"
                    />
                    {/* scan lines — monitor desligando o brilho no hover */}
                    <div
                      aria-hidden="true"
                      className="scanlines pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-200 group-hover:opacity-20"
                    />
                  </div>
                )}

                <div className="relative flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-2xl font-black tracking-tight text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-6 font-light text-dim">
                    {p.description}
                  </p>

                  {/* decisões técnicas como diff + dependências como import */}
                  <div className="mt-5 space-y-2.5 border-l-2 border-signal/40 bg-shell/70 py-2.5 pr-3 pl-3.5">
                    <div>
                      <p className="mono-label text-faint">decisions.diff</p>
                      <ul className="mt-1.5 space-y-1">
                        {p.decisions.map((d) => (
                          <li
                            key={d}
                            className="font-mono text-[11px] leading-5 text-dim"
                          >
                            <span className="mr-1.5 text-ok">+</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="border-t border-line/60 pt-2.5 font-mono text-[11px] break-words text-dim">
                      <span className="text-signal">import</span> {"{ "}
                      {p.tech.join(", ")}{" "}
                      <span className="text-line-strong">{"}"}</span>{" "}
                      <span className="text-faint">from</span>{" "}
                      <span className="text-ok">"{p.id}"</span>;
                    </p>
                  </div>

                  {/* links como comandos de terminal */}
                  <div className="mt-6 flex items-center justify-between border-t border-line pt-4 font-mono text-xs">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="relative z-10 inline-flex items-center gap-1.5 text-dim transition-colors hover:text-signal"
                    >
                      <span className="text-faint">$</span> open código-fonte
                      <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visitar site do projeto ${p.title}`}
                        className="inline-flex items-center gap-1.5 text-dim transition-colors after:absolute after:inset-0 after:content-[''] hover:text-ok"
                      >
                        <span className="text-faint">$</span> visitar
                        <span
                          aria-hidden="true"
                          className="inline-block size-1.5 rounded-full bg-ok"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <a
          href="https://github.com/murilotecoteco?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="group mt-8 inline-flex items-center gap-2 font-mono text-sm text-dim transition-colors hover:text-ink"
        >
          <span className="text-signal">$</span> ls -la ~/todos-os-repos
          <span className="text-faint transition-transform duration-200 group-hover:translate-x-1">
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}

export default Projects;
