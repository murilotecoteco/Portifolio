import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { profile, projects } from "../data/portfolio";

/*
  Terminal de verdade no canto do hero — responde a comandos digitados.
  help · whoami · stack · status · formacao · projetos · github · sudo · clear
*/
function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<ReactNode[]>([
    <div key="boot" className="text-faint">
      bash — sessão iniciada.
    </div>,
  ]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const keyRef = useRef(0);

  /* abre sozinho no desktop, quando há folga de altura */
  useEffect(() => {
    const roomy = window.matchMedia(
      "(min-width: 721px) and (min-height: 760px)",
    );
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!roomy.matches || reduce.matches) return;
    const t = window.setTimeout(() => setOpen(true), 700);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines, open]);

  const print = (node: ReactNode) => {
    keyRef.current += 1;
    const key = keyRef.current;
    setLines((prev) => [...prev, <div key={key}>{node}</div>]);
  };

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    print(
      <>
        <span className="text-ok">$</span> {cmd}
      </>,
    );
    const name = cmd.split(/\s+/)[0];

    if (name === "clear") {
      setLines([]);
    } else if (name === "help" || name === "ls") {
      print(
        <span className="text-faint">
          comandos: whoami · stack · status · formacao · projetos · github ·
          clear
        </span>,
      );
    } else if (name === "whoami") {
      print(
        <>
          Murilo de Souza Cândido —{" "}
          <span className="text-signal">dev front-end</span> em formação.
          <br />
          <span className="text-faint">
            desmonta sistemas, constrói os seus, contribui com os dos outros.
          </span>
        </>,
      );
    } else if (name === "stack") {
      print(
        <>
          React <span className="text-faint">·</span> TypeScript{" "}
          <span className="text-faint">·</span> Angular{" "}
          <span className="text-faint">·</span> Flutter{" "}
          <span className="text-faint">— e sempre um terminal aberto</span>
        </>,
      );
    } else if (name === "status") {
      print(
        <>
          <span className="text-ok">online</span> — {profile.availability}
        </>,
      );
    } else if (name === "formacao" || name === "formação") {
      print(
        <>
          Téc. Informática p/ Internet — IFPR
          <br />
          <span className="text-faint">
            + disciplinas de Sistemas p/ Internet na UTFPR (aluno especial)
          </span>
        </>,
      );
    } else if (name === "projetos") {
      print(
        <>
          <span className="text-faint">módulos no ar:</span>
          {projects.map((p) => (
            <div key={p.id}>
              · {p.title.toLowerCase()} —{" "}
              <a
                href={p.demo ?? p.link}
                target="_blank"
                rel="noreferrer"
                className="border-b border-signal text-ink"
              >
                demo ↗
              </a>
            </div>
          ))}
        </>,
      );
    } else if (name === "github") {
      print(
        <span className="text-signal">
          abrindo github.com/murilotecoteco …
        </span>,
      );
      window.open(profile.github, "_blank", "noopener");
    } else if (name === "sudo") {
      print(
        <span className="text-faint">
          bom tentativo. esse terminal é só uma vitrine — mas a intenção conta.
        </span>,
      );
    } else {
      print(
        <>
          comando não encontrado: {cmd}{" "}
          <span className="text-faint">— tente “help”</span>
        </>,
      );
    }
  };

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) window.setTimeout(() => inputRef.current?.focus(), 60);
  };

  const onToggleKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  const onInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    }
  };

  return (
    <section
      aria-label="Terminal interativo"
      className="border border-line bg-panel/90 font-mono text-[0.76rem] text-ink backdrop-blur-sm"
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={toggle}
        onKeyDown={onToggleKey}
        className="flex cursor-pointer items-center gap-1.5 border-b border-line px-3.5 py-2 text-[0.68rem] text-faint select-none"
      >
        <span className="text-signal">┌─[</span> murilo@dev{" "}
        <span className="text-signal">]</span>
        <span className="ml-auto tracking-wider">digite “help”</span>
      </div>

      {open && (
        <div
          ref={bodyRef}
          onClick={() => inputRef.current?.focus()}
          className="max-h-60 overflow-y-auto px-3.5 pt-3 pb-3.5 leading-relaxed"
        >
          {lines}
          <div className="flex items-baseline gap-2">
            <span className="text-ok">$</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onInputKey}
              type="text"
              autoComplete="off"
              spellCheck={false}
              aria-label="comando"
              placeholder="help"
              className="w-full border-none bg-transparent text-ink outline-none caret-signal"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Terminal;
