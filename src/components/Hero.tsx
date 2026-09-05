import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Terminal from "./Terminal";
import { Dot, GithubIcon } from "./system";
import { profile } from "../data/portfolio";

const GLYPHS = "#$%&@/\\<>[]=+*";

/* embaralha as letras em caracteres técnicos e resolve de volta */
function Scramble({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const busy = useRef(false);
  const reduce = useReducedMotion();

  const run = () => {
    if (reduce || busy.current) return;
    const el = ref.current;
    if (!el) return;
    busy.current = true;

    const spans = [...text].map((ch) => {
      const s = document.createElement("span");
      s.textContent = ch;
      s.className = "inline-block min-w-[0.28em]";
      return s;
    });
    el.replaceChildren(...spans);

    const settled = spans.map(() => false);
    let frame = 0;
    const tick = () => {
      let done = true;
      spans.forEach((s, i) => {
        if (settled[i]) return;
        if (frame > i * 3 + 6) {
          settled[i] = true;
          s.textContent = text[i];
        } else {
          done = false;
          s.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
      });
      if (done) {
        busy.current = false;
      } else {
        frame++;
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  };

  return (
    <span ref={ref} className={className} onPointerEnter={run}>
      {text}
    </span>
  );
}

function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  /* parallax sutil das anotações flutuantes (lerp via rAF) */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduce || !window.matchMedia("(pointer: fine)").matches)
      return;

    const layers = Array.from(
      root.querySelectorAll<HTMLElement>("[data-depth]"),
    );
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const loop = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      for (const el of layers) {
        const d = Number(el.dataset.depth) || 0;
        el.style.transform = `translate3d(${(-cx * 14 * d).toFixed(2)}px,${(-cy * 10 * d).toFixed(2)}px,0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.55,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative flex min-h-screen flex-col overflow-hidden pt-20"
    >
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute inset-0"
      />

      {/* anotação de status — não é um pill */}
      <motion.div
        {...enter(0.1)}
        className="px-6 max-lg:mb-7 sm:px-10 lg:absolute lg:top-24 lg:right-12 lg:z-10 lg:px-0 lg:text-right"
      >
        <div
          data-depth="0.35"
          className="font-mono text-[0.72rem] tracking-wide text-faint will-change-transform"
        >
          <p className="flex items-center gap-2 text-dim max-lg:justify-start lg:justify-end">
            <Dot state="ok" />
            system.status — online
          </p>
          <p className="mt-1.5">
            <span className="text-ok">{profile.availability}</span>
          </p>
        </div>
      </motion.div>

      {/* régua geográfica vertical */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-5 hidden -translate-y-1/2 rotate-180 lg:block"
      >
        <div
          data-depth="0.18"
          className="font-mono text-[0.64rem] tracking-[0.32em] text-faint uppercase [writing-mode:vertical-rl] will-change-transform"
        >
          <span className="mb-4 block h-12 w-px bg-line" />
          Paraná, Brasil — UTC−3
        </div>
      </div>

      {/* régua da stack vertical */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-5 hidden -translate-y-1/2 lg:block"
      >
        <div
          data-depth="0.26"
          className="font-mono text-[0.68rem] tracking-[0.22em] text-dim [writing-mode:vertical-rl] will-change-transform"
        >
          React<span className="py-1.5 text-signal">·</span>TypeScript
          <span className="py-1.5 text-signal">·</span>Angular
          <span className="py-1.5 text-signal">·</span>Flutter
          <span className="mt-4 block h-12 w-px bg-line" />
        </div>
      </div>

      <div className="relative flex flex-1 flex-col justify-center px-6 pb-24 sm:px-10 lg:px-12">
        {/* nome fragmentado — escada assimétrica de pesos extremos */}
        <motion.h1
          {...enter(0.15)}
          aria-label="Murilo de Souza Cândido"
          className="text-ink leading-[0.88] select-none"
        >
          <Scramble
            text="MURILO"
            className="block text-[clamp(3.4rem,11vw,8.2rem)] font-black tracking-[-0.035em]"
          />
          <span className="mt-1.5 block ml-[clamp(1.5rem,14vw,11rem)] text-[clamp(1.5rem,4.6vw,3.4rem)] font-light text-signal italic">
            de Souza
          </span>
          <Scramble
            text="CÂNDIDO"
            className="mt-1 block text-[clamp(3.8rem,13vw,9.6rem)] font-black text-transparent [-webkit-text-stroke:2px_var(--color-ink)]"
          />
        </motion.h1>

        <motion.p
          {...enter(0.2)}
          className="mt-6 flex max-w-[36rem] flex-wrap items-baseline gap-y-1 font-mono text-[0.68rem] tracking-[0.1em] text-faint uppercase sm:text-xs sm:tracking-[0.18em] lg:ml-[22vw]"
        >
          <span>front-end</span>
          <span aria-hidden="true" className="px-2 text-signal">·</span>
          <span>React</span>
          <span aria-hidden="true" className="px-2 text-signal">·</span>
          <span>TypeScript</span>
          <span aria-hidden="true" className="px-2 text-signal">·</span>
          <span>Node</span>
          <span aria-hidden="true" className="px-2 text-signal">·</span>
          <span>Angular</span>
        </motion.p>

        <motion.p
          {...enter(0.25)}
          className="mt-6 max-w-[36rem] text-[clamp(1.02rem,1.7vw,1.3rem)] leading-[1.65] font-light text-dim lg:ml-[22vw]"
        >
          Desmonto{" "}
          <span className="shadow-[inset_0_-0.34em_rgb(235_94_40_/_0.28)]">
            sistemas
          </span>{" "}
          para entender como funcionam. Depois,{" "}
          <em className="font-semibold text-ink not-italic">
            construo os meus
          </em>{" "}
          — e contribuo com os dos outros.
        </motion.p>

        <motion.div
          {...enter(0.35)}
          className="mt-9 flex flex-wrap gap-3.5 font-mono text-[0.85rem] lg:ml-[22vw]"
        >
          <a
            href="#projetos"
            className="group inline-flex items-center gap-2 bg-signal px-5 py-3 font-medium text-contrast transition-colors hover:bg-signal-hi"
          >
            ver projetos
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 border border-line px-5 py-3 text-dim transition-colors hover:border-ink hover:text-ink"
          >
            <GithubIcon className="size-4" />
            github
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* terminal interativo */}
        <motion.div
          {...enter(0.45)}
          className="mt-10 w-full lg:absolute lg:right-12 lg:bottom-8 lg:z-10 lg:mt-0 lg:w-[min(21rem,calc(100vw-3rem))]"
        >
          <div data-depth="0.3" className="will-change-transform">
            <Terminal />
          </div>
        </motion.div>

        {/* formação */}
        <motion.div
          {...enter(0.5)}
          className="max-lg:mt-8 lg:absolute lg:bottom-8 lg:left-12"
        >
          <div
            data-depth="0.22"
            className="font-mono text-[0.72rem] tracking-wide text-faint will-change-transform"
          >
            <span className="mb-2.5 block h-px w-10 bg-signal" />
            <span className="text-dim">ifpr</span> — téc. informática p/
            internet
          </div>
        </motion.div>
      </div>

      {/* indicador de scroll */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-0 right-0 mx-auto hidden w-fit flex-col items-center gap-2 font-mono text-[0.62rem] tracking-[0.3em] text-faint uppercase sm:flex"
      >
        <div className="scroll-track" />
        <span>scroll</span>
      </div>
    </section>
  );
}

export default Hero;
