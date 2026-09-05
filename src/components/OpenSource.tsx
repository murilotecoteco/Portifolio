import { useRef, useState } from "react";
import { Check, Copy, GitMerge, GitPullRequest } from "lucide-react";
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
      className="relative border-y border-line bg-panel/40 py-24 sm:py-32"
    >
      <p
        aria-hidden="true"
        className="absolute top-1/2 -left-9 hidden -translate-y-1/2 rotate-180 font-mono text-[0.62rem] tracking-[0.32em] text-faint uppercase [writing-mode:vertical-rl] xl:block"
      >
        git log --author=murilotecoteco
      </p>

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
