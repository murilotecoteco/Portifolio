import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Corners, Dot, GithubIcon } from "./system";
import { profile } from "../data/portfolio";

const LAST_DEPLOY = "2026-09-05";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function Contact() {
  const [clock, setClock] = useState("--:--:--");
  const [uptime, setUptime] = useState("00:00:00");
  const [year, setYear] = useState("2026");

  useEffect(() => {
    const startedAt = Date.now();
    const tick = () => {
      const n = new Date();
      setYear(String(n.getFullYear()));
      setClock(
        `${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`,
      );
      const el = Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
      setUptime(
        `${pad(Math.floor(el / 3600))}:${pad(Math.floor((el % 3600) / 60))}:${pad(el % 60)}`,
      );
    };
    tick();
    const t = window.setInterval(tick, 1000);
    return () => window.clearInterval(t);
  }, []);

  return (
    <section id="contato" className="relative py-24 sm:py-32">
      <p
        aria-hidden="true"
        className="absolute top-1/2 -left-9 hidden -translate-y-1/2 rotate-180 font-mono text-[0.62rem] tracking-[0.32em] text-faint uppercase [writing-mode:vertical-rl] xl:block"
      >
        open ~/portfolio/contato — última linha
      </p>

      <div className="mx-auto max-w-6xl px-6">
        <div className="relative border border-line bg-panel/60 px-6 py-14 sm:px-12 sm:py-16">
          <Corners className="absolute -top-px -left-px -right-px -bottom-px" />

          {/* periferia do painel — coordenadas, timestamp, status */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5 font-mono text-[0.68rem] text-faint">
            <p>
              <span className="text-signal">~</span>/portfolio/contato
            </p>
            <p className="flex items-center gap-2">
              <Dot state="ok" />
              system.status — <span className="text-ok">online</span>
            </p>
            <p className="hidden sm:block">
              local time <span className="text-dim">{clock}</span> UTC−3
            </p>
            <p className="hidden md:block">
              lat <span className="text-dim">−25.2521</span> · lon{" "}
              <span className="text-dim">−51.4891</span>
            </p>
          </div>

          {/* headline agressiva — ecoa o tratamento do nome no hero */}
          <h2 className="mt-12 leading-[0.95] tracking-tight select-none">
            <span className="block text-[clamp(2.2rem,6vw,4.5rem)] font-black text-ink">
              Vamos construir
            </span>
            <span className="block text-[clamp(2.6rem,7vw,5.2rem)] font-black text-transparent italic [-webkit-text-stroke:2px_var(--color-signal)]">
              algo.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 font-light text-dim sm:text-base sm:leading-8">
            Projetos, contribuições open source, oportunidades de aprender
            trabalhando — o melhor lugar para me encontrar é o GitHub. Issues,
            PRs e discussões são sempre bem-vindos.
          </p>

          <div className="mt-9 flex flex-wrap gap-4 font-mono text-sm">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 bg-signal px-6 py-3 font-medium text-contrast transition-colors hover:bg-signal-hi"
            >
              <GithubIcon className="size-4" />
              github.com/murilotecoteco
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={`${profile.github}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-line px-6 py-3 text-dim transition-colors hover:border-ink hover:text-ink"
            >
              <span className="text-faint">$</span> ver repositórios
            </a>
          </div>
        </div>
      </div>

      {/* rodapé — metadados reais de sistema */}
      <footer className="mt-20 border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-7 font-mono text-[0.68rem] text-faint">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span>© {year} murilo de souza cândido</span>
            <span>
              build <span className="text-signal">v2.0</span>
            </span>
            <span>react · tailwind · linux</span>
          </div>
          <div className="mt-3 flex flex-col gap-2 border-t border-line/60 pt-3 sm:flex-row sm:items-center sm:justify-between">
            <span>
              session uptime <span className="text-dim">{uptime}</span>
            </span>
            <span>
              last deploy <span className="text-dim">{LAST_DEPLOY}</span>
            </span>
            <span className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block size-1.5 rounded-full bg-ok"
              />
              all systems operational
            </span>
          </div>
        </div>
      </footer>
    </section>
  );
}

export default Contact;
