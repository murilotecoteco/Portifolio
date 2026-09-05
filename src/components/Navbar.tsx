import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GithubIcon } from "./system";
import { profile } from "../data/portfolio";

const links = [
  { href: "#projetos", label: "projetos" },
  { href: "#open-source", label: "open source" },
  { href: "#sobre", label: "sobre" },
  { href: "#contato", label: "contato" },
];

/* easing: abertura bouncy (back.out), fechamento suave e rápido (easeReverse) */
const OPEN_EASE = [0.34, 1.56, 0.64, 1] as const;
const EXIT_EASE = [0.4, 0, 1, 1] as const;

function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* fecha com Escape e devolve o foco ao botão (padrão do menu-ilha) */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const onToggleKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((v) => !v);
    }
  };

  /* mantém o Tab circulando entre botão e links enquanto aberto */
  const trapTab = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const focusable = [
      ...e.currentTarget.querySelectorAll<HTMLElement>("a"),
    ];
    if (!focusable.length) return;
    const [first, last] = [focusable[0], focusable[focusable.length - 1]];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      toggleRef.current?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      focusable[0].focus();
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-shell/85 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6"
        aria-label="Navegação principal"
      >
        <a
          href="#home"
          className="flex items-baseline gap-1 font-mono text-sm font-medium tracking-tight text-ink"
        >
          murilo<span className="text-signal">.dev</span>
          <span
            aria-hidden="true"
            className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-[1px] bg-signal animate-caret"
          />
          <span className="sr-only">— voltar ao início</span>
        </a>

        {/* desktop: links inline */}
        <div className="hidden items-center gap-7 font-mono text-xs text-dim sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative whitespace-nowrap transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-signal after:transition-transform hover:text-ink hover:after:scale-x-100"
            >
              {l.label}
            </a>
          ))}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub de Murilo"
            className="transition-colors hover:text-signal"
          >
            <GithubIcon className="size-4" />
          </a>
        </div>

        {/* mobile: gatilho da ilha */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          onKeyDown={onToggleKey}
          aria-expanded={open}
          aria-controls="menu-overlay"
          aria-label={open ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          className="relative z-50 flex size-10 flex-col items-center justify-center gap-[5px] border border-line bg-panel text-ink transition-colors hover:border-line-strong sm:hidden"
        >
          <span
            aria-hidden="true"
            className={`block h-px w-4 bg-current transition-transform duration-200 ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            aria-hidden="true"
            className={`block h-px w-4 bg-current transition-transform duration-200 ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
            className="fixed inset-0 top-16 z-40 bg-shell/80 backdrop-blur-sm sm:hidden"
          />
        )}
      </AnimatePresence>

      {/* ilha do menu — expande do botão com back.out, retrai suave */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="island"
            id="menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            initial={{ opacity: 0, scale: 0.7, y: -10 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { duration: 0.35, ease: OPEN_EASE },
            }}
            exit={{
              opacity: 0,
              scale: 0.85,
              y: -6,
              transition: { duration: 0.18, ease: EXIT_EASE },
            }}
            style={{ transformOrigin: "top right" }}
            onKeyDown={trapTab}
            className="fixed top-[4.4rem] right-4 left-4 z-50 origin-top-right border border-line bg-panel font-mono text-sm shadow-2xl shadow-black/60 sm:hidden"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-[0.68rem] text-faint">
              <span>
                <span className="text-signal">┌─[</span> menu{" "}
                <span className="text-signal">]</span>
              </span>
              <span>esc para fechar</span>
            </div>

            <motion.ul
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0, when: "afterChildren" } },
              }}
              className="p-1.5"
            >
              {links.map((l) => (
                <motion.li
                  key={l.href}
                  variants={{
                    open: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.25, ease: OPEN_EASE },
                    },
                    closed: { opacity: 0, x: 14, transition: { duration: 0.1 } },
                  }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-2.5 border-b border-line/50 px-3 py-3.5 text-dim transition-colors last:border-b-0 hover:bg-raise hover:text-signal"
                  >
                    <span className="text-faint transition-colors group-hover:text-signal">
                      $
                    </span>
                    {l.label}
                    <span className="ml-auto text-faint opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      ↗
                    </span>
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  open: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.25, ease: OPEN_EASE },
                  },
                  closed: { opacity: 0, x: 14, transition: { duration: 0.1 } },
                }}
                className="border-t border-line p-1.5"
              >
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 px-3 py-2 text-dim transition-colors hover:text-ink"
                >
                  <GithubIcon className="size-4" />
                  github
                  <span className="ml-auto text-faint">↗</span>
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
