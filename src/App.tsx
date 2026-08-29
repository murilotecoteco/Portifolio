import Navbar from "./components/Navbar"

function App() {
return ( <main className="min-h-screen bg-[#09090b] text-white"> <Navbar />

```
  <section
    id="home"
    className="flex min-h-screen items-center justify-center px-6 pt-16"
  >
    <div className="mx-auto max-w-4xl text-center">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-violet-400">
        Software Developer
      </p>

      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
        Olá, eu sou{" "}
        <span className="text-violet-500">Murilo.</span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
        Estudante de Informática para Web no IFPR, construindo aplicações
        web, APIs e soluções orientadas a dados — do desenvolvimento ao
        deploy.
      </p>

      <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
        <a
          href="#projetos"
          className="rounded-lg bg-violet-600 px-6 py-3 font-medium transition hover:bg-violet-500"
        >
          Ver projetos
        </a>

        <a
          href="https://github.com/murilotecoteco"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-white/10 px-6 py-3 font-medium text-zinc-300 transition hover:border-white/20 hover:text-white"
        >
          GitHub
        </a>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm text-zinc-500">
        <span>React</span>
        <span>·</span>
        <span>TypeScript</span>
        <span>·</span>
        <span>Node.js</span>
        <span>·</span>
        <span>PostgreSQL</span>
      </div>
    </div>
  </section>
</main>


)
}

export default App
