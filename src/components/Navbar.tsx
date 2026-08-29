function Navbar() {
return ( <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#09090b]/80 backdrop-blur-md"> <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"> <a
       href="#home"
       className="text-lg font-bold tracking-tight text-white"
     >
MURILO<span className="text-violet-500">.</span> </a>


    <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
      <a href="#projetos" className="transition-colors hover:text-white">
        Projetos
      </a>

      <a href="#stack" className="transition-colors hover:text-white">
        Stack
      </a>

      <a href="#sobre" className="transition-colors hover:text-white">
        Sobre
      </a>

      <a href="#contato" className="transition-colors hover:text-white">
        Contato
      </a>
    </div>
  </nav>
</header>


)
}

export default Navbar
