import { useRef, useState } from "react";
import { Check, Copy, GitMerge, GitPullRequest } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHead } from "./system";
import { contributions } from "../data/portfolio";

/* hash determinístico estilo commit, derivado do número do PR */
function hashOf(seed: string) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h.toString(16).padStart(7, "0").slice(0, 7);
}

const CLONE_CMD =
  "git clone https://github.com/Tecnologia-da-Informacao-BR/Calendar.git";

function OpenSource() {
  const merged = contributions.filter((c) => c.state === "merged").length;
  const open = contributions.length - merged;
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(0);

  const copy = () => {
    navigator.clipboard?.writeText(CLONE_CMD).catch(() => {});
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section
      id="open-source"
      className="relative border-y border-line bg-panel/40 py-24 sm:py-32 overflow-hidden"
    >
      <p
        aria-hidden="true"
        className="absolute top-1/2 -left-9 hidden -translate-y-1/2 rotate-180 font-mono text-[0.62rem] tracking-[0.32em] text-faint uppercase [writing-mode:vertical-rl] xl:block"
      >
        git log --author=murilotecoteco
      </p>

      {/* Ícones flutuantes */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 md:top-32 left-[5%] md:left-[10%] opacity-40 hover:opacity-100 transition-opacity duration-500 pointer-events-auto"
      >
        {/* Angular */}
        <svg viewBox="0 0 250 250" className="size-16 md:size-24 drop-shadow-2xl">
          <path fill="#DD0031" d="M125 30L31.9 63.2l14.2 123.1L125 230l78.9-43.7 14.2-123.1z"/>
          <path fill="#FFFFFF" d="M125 52.1L66.8 182.6h21.7l11.7-29.2h49.4l11.7 29.2H183L125 52.1zm17 83.3h-34l17-40.9 17 40.9z"/>
        </svg>
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-40 md:top-64 right-[5%] md:right-[8%] opacity-40 hover:opacity-100 transition-opacity duration-500 pointer-events-auto"
      >
        {/* Tailwind */}
        <svg viewBox="0 0 24 24" fill="none" className="size-14 md:size-20 drop-shadow-2xl">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" fill="#06B6D4"/>
        </svg>
      </motion.div>

      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-10 md:bottom-16 left-[40%] md:left-[50%] opacity-40 hover:opacity-100 transition-opacity duration-500 pointer-events-auto"
      >
        {/* TypeScript */}
        <svg viewBox="0 0 24 24" className="size-12 md:size-16 drop-shadow-2xl">
          <path fill="#3178C6" d="M2 2h20v20H2z"/>
          <path fill="#FFF" d="M13.82 17.58c-1.4 0-2.43-.37-3.1-.96l.73-1.6c.64.44,1.49.82,2.4.82.91 0,1.38-.34,1.38-.85 0-.58-.64-.81-1.88-1.25-1.55-.57-2.61-1.39-2.61-2.9 0-1.58,1.21-2.82,3.31-2.82,1.33 0,2.16.34,2.83.78l-.7 1.54c-.58-.37-1.29-.68-2.11-.68-.84 0-1.23.41-1.23.82 0 .56.65.75,1.91 1.23 1.56.59 2.58 1.34 2.58 2.91 0 1.63-1.2 2.96-3.51 2.96zm-7.69-7.25h3.69v1.65h-1.88v6.79H6.13z"/>
        </svg>
      </motion.div>


      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          index="02"
          path="open-source"
          title="Open Source"
          blurb="Contribuições reais em projetos da comunidade — ler código de outras pessoas, seguir convenções e escrever PRs que passam por revisão."
        />

        <div className="mt-12 grid gap-10 grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-16">
          {/* entrada de diário técnico + displays de terminal */}
          <div>
            <div className="font-mono text-[0.7rem] tracking-wide text-faint">
              <p>
                <span className="text-signal">#</span> diário de contribuição
              </p>
              <p className="mt-1">
                registro: <span className="text-dim">2026-08-16 → hoje</span>
              </p>
            </div>

            <p className="mt-5 text-sm leading-7 font-light text-dim sm:text-base sm:leading-8">
              Minha porta de entrada para o software livre foi contribuir com
              um projeto real da comunidade brasileira. Cada PR é um exercício
              de comunicação técnica: entender a base, propor uma mudança
              clara e sustentá-la em revisão.
            </p>

            {/* displays de terminal */}
            <div className="mt-8 grid grid-cols-3 gap-px border border-line bg-line font-mono">
              {[
                {
                  v: String(contributions.length).padStart(2, "0"),
                  k: "prs",
                  extra: null,
                },
                {
                  v: String(merged).padStart(2, "0"),
                  k: "merged",
                  extra: null,
                },
                { v: String(open).padStart(2, "0"), k: "open", extra: "caret" },
              ].map((s) => (
                <div key={s.k} className="bg-panel px-4 py-5 text-center">
                  <p className="text-3xl font-semibold tracking-tight text-ink">
                    {s.v}
                    {s.extra === "caret" && (
                      <span
                        aria-hidden="true"
                        className="ml-1 inline-block h-5 w-[7px] translate-y-0.5 bg-signal"
                      />
                    )}
                  </p>
                  <p className="mono-label mt-2 text-faint">{s.k}</p>
                </div>
              ))}
            </div>

            {/* clone command copiável */}
            <div className="mt-6 flex items-center gap-3 border border-line bg-shell px-4 py-3">
              <p className="min-w-0 flex-1 truncate font-mono text-[0.7rem] text-dim">
                <span className="text-ok">$</span> {CLONE_CMD}
              </p>
              <button
                type="button"
                onClick={copy}
                aria-label="Copiar comando git clone"
                className="flex size-7 shrink-0 items-center justify-center border border-line text-faint transition-colors hover:border-line-strong hover:text-ink"
              >
                {copied ? (
                  <Check className="size-3.5 text-ok" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </button>
            </div>
            <p
              className="mt-2 h-4 font-mono text-[0.65rem] text-ok transition-opacity duration-200"
              style={{ opacity: copied ? 1 : 0 }}
              role="status"
            >
              copiado para a área de transferência.
            </p>
          </div>

          {/* git log --oneline estilizado */}
          <div>
            <p
              aria-hidden="true"
              className="mb-3 font-mono text-[0.7rem] text-faint"
            >
              $ git log --oneline --author=murilotecoteco
            </p>
            <ol className="relative border-l border-line pl-6 font-mono">
              {contributions.map((c) => (
                <li key={c.pr} className="relative">
                  {/* nó do grafo */}
                  <span
                    aria-hidden="true"
                    className={`absolute top-4 -left-[31px] flex size-[13px] items-center justify-center rounded-full border border-line bg-panel text-[8px] leading-none ${
                      c.state === "merged" ? "text-ok" : "text-signal"
                    }`}
                  >
                    *
                  </span>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group -mx-3 block border border-transparent px-3 py-3.5 transition-colors hover:border-line hover:bg-shell"
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span
                        className={`text-[0.7rem] ${
                          c.state === "merged" ? "text-faint" : "text-signal"
                        }`}
                      >
                        {hashOf(c.pr)}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] tracking-[0.1em] uppercase ${
                          c.state === "merged"
                            ? "border-ok/25 bg-ok/5 text-ok"
                            : "border-signal/25 bg-signal/5 text-signal"
                        }`}
                      >
                        {c.state === "merged" ? (
                          <GitMerge className="size-3" />
                        ) : (
                          <GitPullRequest className="size-3" />
                        )}
                        {c.state}
                      </span>
                      <span className="text-[0.7rem] text-faint">
                        {c.date}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-ink transition-colors group-hover:text-signal">
                      {c.title}
                    </p>
                    <p className="mt-1 text-[0.7rem] break-words text-faint">
                      refs {c.repo}
                      {c.pr}
                    </p>
                  </a>
                </li>
              ))}
              {/* HEAD */}
              <li aria-hidden="true" className="relative pt-1">
                <span className="absolute top-3.5 -left-[31px] flex size-[13px] items-center justify-center rounded-full border border-line bg-panel text-[8px] text-faint">
                  *
                </span>
                <p className="py-1 text-[0.7rem] text-faint">
                  HEAD → <span className="text-signal">next-contribution</span>
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OpenSource;
