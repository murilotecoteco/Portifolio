import { GithubIcon } from "./system";
import { profile } from "../data/portfolio";

const links = [
  { href: "#projetos", label: "projetos" },
  { href: "#open-source", label: "open source" },
  { href: "#sobre", label: "sobre" },
  { href: "#contato", label: "contato" },
];

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-shell/85 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6"
        aria-label="Navegação principal"
      >
        <a
          href="#home"
          className="font-mono text-sm font-medium tracking-tight text-ink"
        >
          murilo<span className="text-signal">.dev</span>
        </a>

        <div className="flex items-center gap-2.5 font-mono text-[0.66rem] text-dim max-[420px]:gap-2 max-[420px]:text-[0.6rem] sm:gap-7 sm:text-xs">
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
      </nav>
    </header>
  );
}

export default Navbar;
