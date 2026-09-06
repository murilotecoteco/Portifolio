import academiaInicio from "../assets/academiainicio.webp";
import SolarCME from "../assets/solarcme.webp";
import taskManager from "../assets/taskmanager.webp";

export const profile = {
  name: "Murilo de Souza Cândido",
  first: "Murilo",
  role: "Desenvolvedor Front-end",
  headline:
    "Desmonto sistemas para entender como funcionam. Depois, construo os meus — e contribuo com os dos outros.",
  intro:
    "Estudante de Informática para Internet no IFPR e aluno especial em Sistemas para Internet na UTFPR, focado em desenvolvimento front-end — interfaces e aplicações web com craft e atenção a detalhe.",
  location: "Paraná, BR · UTC−3",
  github: "https://github.com/murilotecoteco",
  email: "candidomurilo809@gmail.com",
  status: "online — aberto a oportunidades",
  availability: "aberto a oportunidades",
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  type: string;
  status: { label: string; state: "ok" | "building" | "idle" };
  image?: string;
  link: string;
  demo?: string;
  featured?: boolean;
  /** decisões técnicas reais — exibidas como bloco de diff */
  decisions: string[];
};

export const projects: Project[] = [
  {
    id: "mod-01",
    title: "Academia com Pagamentos",
    description:
      "Aplicação web full stack para gerenciamento de planos de academia e assinaturas recorrentes, com autenticação, checkout e webhooks.",
    tech: ["HTML5", "CSS3", "JavaScript", "Node.js", "Express", "Zod", "Supabase", "Stripe", "Jest", "Git", "GitHub", "Render"],
    type: "full stack",
    status: { label: "finalizado", state: "ok" },
    image: academiaInicio,
    link: "https://github.com/murilotecoteco/gym-membership-payments",
    demo: "https://academia-com-pagamentos.onrender.com/",
    featured: true,
    decisions: [
      "jwt em todas as rotas — user_id vem do token, nunca do body",
      "webhook com assinatura verificada e processamento idempotente",
      "plan_id em allowlist server-side — price_id nunca exposto ao cliente",
      "rate limiting (10 req/min) no checkout e no billing portal",
      "suite offline: jest + supertest com mocks de stripe/supabase",
      "ci/cd no github actions: testes rodam a cada push",
    ],
  },
  {
    id: "mod-02",
    title: "Solar CME Monitor",
    description:
      "Aplicação web para monitoramento de eventos solares (CMEs) e previsão de impacto em infraestrutura crítica.",
    tech: ["React", "Vite", "JavaScript", "TypeScript", "CSS3", "Supabase", "PostgreSQL", "Deno", "Vercel", "Git", "Vitest", "GitHub Actions"],
    type: "data app",
    status: { label: "finalizado", state: "ok" },
    image: SolarCME,
    link: "https://github.com/murilotecoteco/cme-dashboard",
    demo: "https://solar-cme-monitor.vercel.app/",
    decisions: [
      "edge function como proxy — a api key da nasa nunca chega ao cliente",
      "eventos persistidos em postgres + histórico de buscas",
      "gráficos e estatísticas calculados por evento",
      "testes com fake timers: vitest + testing library",
    ],
  },
  {
    id: "mod-03",
    title: "Task Manager",
    description:
      "Aplicação de gerenciamento de tarefas construída com Next.js e TypeScript, com autenticação e estado global.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Git", "GitHub"],
    type: "web app",
    status: { label: "finalizado", state: "ok" },
    image: taskManager,
    link: "https://github.com/murilotecoteco/task-manager-nextjs-react",
    demo: "https://gerenciador-de-tarefas-one-pearl.vercel.app/",
    decisions: [
      "persistência client-side via localstorage — foco na arquitetura front",
      "filtros por status + dashboard de estatísticas",
      "dark/light theme toggle + toast notifications",
    ],
  },
];

export type Contribution = {
  pr: string;
  title: string;
  repo: string;
  date: string;
  state: "merged" | "open";
  url: string;
};

export const contributions: Contribution[] = [
  {
    pr: "#168",
    title: "feat: add navigation sidebar component",
    repo: "Tecnologia-da-Informacao-BR/Calendar",
    date: "2026-09-05",
    state: "merged",
    url: "https://github.com/Tecnologia-da-Informacao-BR/Calendar/pull/168",
  },
  {
    pr: "#163",
    title: "feat(frontend): create login view",
    repo: "Tecnologia-da-Informacao-BR/Calendar",
    date: "2026-09-04",
    state: "merged",
    url: "https://github.com/Tecnologia-da-Informacao-BR/Calendar/pull/163",
  },
  {
    pr: "#115",
    title: "docs: add contributor murilotecoteco",
    repo: "Tecnologia-da-Informacao-BR/Calendar",
    date: "2026-08-16",
    state: "merged",
    url: "https://github.com/Tecnologia-da-Informacao-BR/Calendar/pull/115",
  },
  {
    pr: "#98",
    title: "feat(frontend): add signup screen",
    repo: "Tecnologia-da-Informacao-BR/Calendar",
    date: "2026-08-16",
    state: "merged",
    url: "https://github.com/Tecnologia-da-Informacao-BR/Calendar/pull/98",
  },
];

export const timeline = [
  {
    version: "v0.1",
    title: "Origem",
    text: "Tudo começou com vontade de entender: o que acontece dentro de uma máquina quando ela liga, abre algo, quebra. Os primeiros scripts foram mais pergunta do que resposta.",
  },
  {
    version: "v0.3",
    title: "IFPR — Técnico em Informática para Internet",
    text: "Lógica, redes, bancos de dados — e a descoberta do Linux, que mudou minha relação com tecnologia: deixei de ser só usuário e comecei a mexer nos parafusos.",
  },
  {
    version: "v0.5",
    title: "Desenvolvimento web",
    text: "Primeiros projetos web de verdade. Aprendi React, TypeScript e que a parte difícil raramente é escrever código — é fazer tudo funcionar junto.",
  },
  {
    version: "v1.0",
    title: "Sistemas completos",
    text: "Do banco de dados ao deploy: uma academia com assinaturas e pagamentos, um monitor de eventos solares. Software com problema real por trás.",
  },
  {
    version: "v1.x",
    title: "Open Source",
    text: "Comecei a contribuir com um projeto da comunidade — ler código de outras pessoas, seguir convenções, escrever PRs que alguém vai revisar. É onde mais aprendo.",
  },
  {
    version: "v1.2",
    title: "UTFPR — aluno especial em Sistemas para Internet",
    text: "Três disciplinas, três camadas: Interface e Linha de Comandos (Linux, Bash e C — o sistema por dentro), Organização de Computadores (o hardware por baixo de tudo) e Computação e Sociedade (segurança e o impacto do que construímos).",
  },
  {
    version: "next",
    title: "Em construção",
    text: "Aprofundar em backend e infraestrutura, contribuir mais e continuar construindo. Esta versão nunca fica pronta — e é esse o plano.",
  },
];

export const toolchain = [
  {
    group: "linguagens",
    items: ["TypeScript", "JavaScript", "Dart", "Python", "SQL"],
  },
  {
    group: "front-end & mobile",
    items: ["React", "Angular", "Flutter", "Tailwind CSS", "Vite"],
  },
  {
    group: "back-end",
    items: ["Node.js", "PostgreSQL", "Supabase", "REST APIs"],
  },
  {
    group: "sistema & ferramentas",
    items: ["Linux", "Git", "GitHub"],
  },
];
