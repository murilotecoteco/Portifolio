import { SectionHead } from "./system";
import { profile, timeline, toolchain } from "../data/portfolio";

function About() {
  return (
    <section id="sobre" className="relative py-24 sm:py-32">
      <p
        aria-hidden="true"
        className="absolute top-1/2 -left-9 hidden -translate-y-1/2 rotate-180 font-mono text-[0.62rem] tracking-[0.32em] text-faint uppercase [writing-mode:vertical-rl] xl:block"
      >
        cat ~/sobre/CHANGELOG.md
      </p>

      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          index="03"
          path="sobre"
          title="Sobre mim"
          blurb="Ninguém começa na versão 1.0. Este é o changelog de como cheguei até aqui — e para onde estou indo."
        />

        <div className="mt-12 grid gap-14 grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
          {/* README.md renderizado */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-line">
              {/* aba do arquivo */}
              <p className="border-b border-line bg-panel px-4 py-2 font-mono text-[0.7rem] text-faint">
                <span className="text-signal">~/sobre</span>/README.md
              </p>

              {/* bloco de metadados */}
              <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 border-b border-line px-4 py-3.5 font-mono text-[0.7rem]">
                <dt className="text-faint">author:</dt>
                <dd className="text-dim">murilo de souza cândido</dd>
                <dt className="text-faint">local:</dt>
                <dd className="text-dim">Paraná, Brasil — UTC−3</dd>
                <dt className="text-faint">status:</dt>
                <dd className="text-ok">{profile.availability}</dd>
                <dt className="text-faint">kernel:</dt>
                <dd className="text-dim">Linux · software livre</dd>
              </dl>

              {/* corpo do README */}
              <div className="px-4 py-5">
                <p className="text-sm leading-7 font-light text-dim sm:text-base sm:leading-8">
                  Sou o tipo de pessoa que abre o capô. Antes de escrever
                  software, eu queria entender o que já estava escrito — como
                  um sistema liga, por que quebra, o que acontece por baixo da
                  interface.
                </p>
                <p className="mt-4 text-sm leading-7 font-light text-dim sm:text-base sm:leading-8">
                  O Linux entrou na minha vida como resposta a essas perguntas:
                  um sistema que se deixa estudar, cuja comunidade acredita que
                  conhecimento deve ser aberto. É essa lógica que levo para o
                  código — e para o Open Source.
                </p>
                <p className="mt-4 text-sm leading-7 font-light text-dim sm:text-base sm:leading-8">
                  Hoje estudo Técnico em Informática para Internet no IFPR,
                  curso disciplinas de Sistemas para Internet na UTFPR como
                  aluno especial — do Bash e do C até organização de
                  computadores e segurança — e construo projetos próprios para
                  transformar curiosidade em habilidade.{" "}
                  <span className="font-medium text-ink not-italic">
                    Uma versão de cada vez.
                  </span>
                </p>
              </div>
            </div>

            {/* âncora da stack */}
            <div id="stack" className="mt-10 scroll-mt-24">
              <p className="font-mono text-[0.7rem] text-faint">
                <span className="text-signal">$</span> ./toolchain --list
              </p>
              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                {toolchain.map((g) => (
                  <div key={g.group}>
                    <h3 className="mono-label text-ink">{g.group}</h3>
                    <ul className="mt-3 space-y-1.5">
                      {g.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2.5 font-mono text-xs text-dim transition-colors hover:text-ink"
                        >
                          <span aria-hidden="true" className="text-signal/60">
                            ▪
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CHANGELOG.md — o protagonista */}
          <div>
            <p
              aria-hidden="true"
              className="mb-4 font-mono text-[0.7rem] text-faint"
            >
              <span className="text-signal">~/sobre</span>/CHANGELOG.md — todas
              as mudanças notáveis
            </p>

            <ol className="relative border-l border-line pl-7 sm:pl-9">
              {timeline.map((t) => {
                const isNext = t.version === "next";
                return (
                  <li key={t.version} className="relative pb-11 last:pb-0">
                    {/* nó do grafo */}
                    <span
                      aria-hidden="true"
                      className={`absolute top-3 -left-[35px] flex size-[13px] items-center justify-center rounded-full border border-line bg-shell text-[8px] sm:-left-[43px] ${
                        isNext ? "text-signal" : "text-faint"
                      }`}
                    >
                      *
                    </span>

                    <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span
                        className={`font-mono text-3xl font-semibold tracking-tight sm:text-4xl ${
                          isNext
                            ? "text-signal"
                            : "text-ink"
                        }`}
                      >
                        {t.version}
                      </span>
                      {isNext ? (
                        <span className="rounded-full border border-signal/40 px-2 py-0.5 font-mono text-[0.62rem] tracking-[0.14em] text-signal uppercase">
                          HEAD — você está aqui
                        </span>
                      ) : (
                        <span className="font-mono text-[0.7rem] text-faint">
                          released
                        </span>
                      )}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">
                      {t.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm leading-7 font-light text-dim">
                      {t.text}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
