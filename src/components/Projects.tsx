import academiaInicio from "../assets/academiainicio.png";
import SolarCME from "/home/murilo/PROJETOS/Portifolio/src/assets/solarcme.jpg";

function Projects() {
  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold">Projetos</h2>
        <p className="mt-2 text-zinc-400">Alguns projetos que desenvolvi.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* card 1 */}
          <div className="rounded-lg border border-white/10 bg-[#09090b]/80 p-6 backdrop-blur-md">
            <img src={academiaInicio} alt="Academia com Pagamentos" className="w-full h-auto rounded-md" />
            <h3 className="mt-4 text-xl font-bold">Academia com Pagamentos</h3>
            <p className="mt-2 text-zinc-400">
              Aplicação web full stack para gerenciamento de planos de academia e assinaturas recorrentes,
              integrando Stripe, Supabase, autenticação e webhooks.
            </p>
          </div>

          {/* card 2 */}
          <div className="rounded-lg border border-white/10 bg-[#09090b]/80 p-6 backdrop-blur-md">
            <img src={SolarCME} alt="Solar Cme Monitor" className="w-full h-auto rounded-md" />
            <h3 className="mt-4 text-xl font-bold">Solar CME Monitor</h3>
            <p className="mt-2 text-zinc-400">
              Aplicação web para monitoramento de eventos solares e previsões de impacto em infraestrutura.
            </p>
          </div>

          {/* card 3 */}
          <div className="rounded-lg border border-white/10 bg-[#09090b]/80 p-6 backdrop-blur-md">
            {/* ... */}
          </div>

          {/* card 4 */}
          <div className="rounded-lg border border-white/10 bg-[#09090b]/80 p-6 backdrop-blur-md">
            {/* ... */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;