import type { ReactNode } from "react";

/*
  Microcomponentes do design system — linguagem de "interface real":
  dots de estado, tags técnicas, marcas de canto e cabeçalhos de seção
  com paginação de progresso. Monospace obrigatório em dados/labels.
*/

export function Dot({ state }: { state: "ok" | "building" | "idle" }) {
  const color =
    state === "ok"
      ? "bg-ok text-ok"
      : state === "building"
        ? "bg-signal text-signal"
        : "bg-faint text-faint";
  return (
    <span
      aria-hidden="true"
      className={`inline-block size-1.5 shrink-0 rounded-full ${color} animate-dot-pulse`}
    />
  );
}

export function StatusTag({
  label,
  state,
}: {
  label: string;
  state: "ok" | "building" | "idle";
}) {
  const tone =
    state === "ok"
      ? "text-ok border-ok/25 bg-ok/5"
      : state === "building"
        ? "text-signal border-signal/25 bg-signal/5"
        : "text-faint border-line-strong bg-white/[0.02]";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-[0.12em] uppercase ${tone}`}
    >
      <Dot state={state} />
      {label}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded border border-line bg-raise/60 px-2 py-0.5 font-mono text-[11px] text-dim transition-colors duration-200 hover:border-line-strong hover:text-ink">
      {children}
    </span>
  );
}

/** Marcas de canto estilo "esquemático" — usadas nos painéis-chave. */
export function Corners({ className = "" }: { className?: string }) {
  const base =
    "pointer-events-none absolute size-3 border-signal/50 transition-all duration-300";
  return (
    <span aria-hidden="true" className={className}>
      <span className={`${base} top-0 left-0 border-t border-l`} />
      <span className={`${base} top-0 right-0 border-t border-r`} />
      <span className={`${base} bottom-0 left-0 border-b border-l`} />
      <span className={`${base} right-0 bottom-0 border-r border-b`} />
    </span>
  );
}

/** Marca do GitHub (lucide não inclui logos de marcas). */
export function GithubIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.26 5.66.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

/**
 * Cabeçalho de seção: breadcrumb de path + título display + paginação
 * de progresso com presença (segmentos preenchidos até a seção atual).
 */
export function SectionHead({
  index,
  path,
  title,
  blurb,
}: {
  index: string;
  path: string;
  title: string;
  blurb?: string;
}) {
  const n = Number(index);
  return (
    <div className="flex items-end justify-between gap-6 border-b border-line pb-6">
      <div>
        <p className="mono-label text-faint">
          <span className="text-signal">~</span>/portfolio/{path}
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-5xl">
          {title}
        </h2>
        {blurb && (
          <p className="mt-3 max-w-xl text-sm leading-6 font-light text-dim sm:text-base sm:leading-7">
            {blurb}
          </p>
        )}
      </div>

      <div aria-hidden="true" className="hidden shrink-0 sm:block">
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`h-1.5 w-8 ${i === n ? "bg-signal" : i < n ? "bg-line-strong" : "bg-line"}`}
            />
          ))}
        </div>
        <p className="mt-2 text-right font-mono text-[0.68rem] text-faint">
          mod <span className="text-ink">{index}</span>
          <span className="text-line-strong"> / 04</span>
        </p>
      </div>
    </div>
  );
}
