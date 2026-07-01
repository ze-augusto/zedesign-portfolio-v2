export type Lang = 'PT' | 'EN';

export interface WhatItem { k: string; v: string; }
export interface ProcessStep { n: string; k: string; v: string; }
export interface ExperienceItem { period: string; company: string; role: string; place: string; bullets: string[]; }
export interface EducationItem { period: string; school: string; degree: string; kind: string; }
export interface SkillGroup { k: string; v: string; }
export interface LangItem { k: string; v: string; }

export interface Translations {
  meta: { lang: string; other: string };
  nav: { home: string; projects: string; about: string; contact: string };
  hero: { subtitle: string; nameShort: string; role: string; intro: { lead: string; em: string }[]; location: string; available: string; contactCta: string; contactSuffix: string };
  bio: { title: string; p1: string; p2: string; p3: string };
  what: { title: string; items: WhatItem[] };
  process: { title: string; steps: ProcessStep[] };
  experience: { title: string; items: ExperienceItem[] };
  education: { title: string; items: EducationItem[] };
  skills: { title: string; groups: SkillGroup[] };
  langs: { title: string; items: LangItem[] };
  contact: { title: string; cta: string; cv: string; portfolio: string };
  footer: { sig: string };
}

export const PT: Translations = {
  meta: { lang: 'PT-BR', other: 'EN' },
  nav: { home: 'Home', projects: 'Projetos', about: 'Sobre', contact: 'Contato' },
  hero: {
    subtitle: 'Pode me chamar de',
    nameShort: 'Zé.',
    role: 'Product Designer',
    intro: [
      { lead: 'Designer e Engenheiro de Produção focado na construção de sistemas complexos,', em: ' do levantamento de requisitos ao handoff.' },
      { lead: 'Atualmente responsável pela transformação dos sistemas ', em: 'financeiro e acadêmico da Universidade de Fortaleza.' },
      { lead: 'Participante direto na criação e no desenvolvimento da plataforma de gestão de licitações públicas da ', em: 'Procuradoria Geral do Estado do Ceará (PGE-CE).' },
    ],
    location: 'Brasil — disponível para deslocamento e trabalhos remotos',
    available: 'Transformando a Universidade de Fortaleza',
    contactCta: 'Clique aqui',
    contactSuffix: ' e fale comigo!',
  },
  bio: {
    title: 'Sobre',
    p1: 'Comecei minha carreira liderando operações de manutenção para mais de 230 lojas, coordenando equipes, fornecedores e cronogramas. Foi onde aprendi que produto bom é produto que funciona em escala — e que processo é matéria-prima de design.',
    p2: 'Hoje desenho sistemas que pessoas realmente usam para trabalhar: plataformas financeiras, acadêmicas e de licitação pública. Trabalho próximo a stakeholders institucionais, transformando regras de negócio densas em fluxos que fazem sentido para quem está do outro lado da tela.',
    p3: 'Minha formação em Engenharia de Produção me dá um repertório de pensamento sistêmico — modelagem de processos, gargalos, indicadores — que aplico em decisões de produto todos os dias.',
  },
  what: {
    title: 'Como trabalho',
    items: [
      { k: 'Requisitos', v: 'Ao alinhar as dores dos usuários com as metas dos stakeholders, traduzo regras de negócio complexas em requisitos claros antes de iniciar a ideação.' },
      { k: 'Fluxogramas', v: 'Ao conectar jornadas de usuário com blueprints de serviço, mapeio como as possíveis ações na tela refletem no sistema como um todo.' },
      { k: 'Wireframes', v: 'Ao criar estruturas de média fidelidade, valido principalmente a hierarquia de componentes e o escopo prático da solução diretamente com a equipe.' },
      { k: 'Alta fidelidade e Prototipação', v: 'Ao modelar interfaces responsivas e nativas, construo protótipos interativos que simulam com precisão o comportamento real do produto.' },
      { k: 'Testes de usabilidade', v: 'Ao aplicar testes qualitativos e quantitativos com usuários reais, busco identificar gargalos na jornada e refino a usabilidade do fluxo com base em dados de comportamento.' },
      { k: 'Validação com devs', v: 'Ao realizar o handoff para a equipe dev, reviso a lógica dos componentes e as regras de banco de dados para mitigar riscos e garantir a viabilidade do código.' },
    ],
  },
  process: {
    title: 'Como trabalho',
    steps: [
      { n: '01', k: 'Requisitos', v: 'Levanto requisitos com stakeholders e usuários. Mapeio o processo institucional antes de qualquer pixel.' },
      { n: '02', k: 'Fluxogramas', v: 'Desenho a jornada do usuário e os fluxos do sistema — onde decisão acontece, onde dados entram e saem.' },
      { n: '03', k: 'Wireframes', v: 'Estrutura antes de estética. Defino arquitetura de informação e validação rápida com o time.' },
      { n: '04', k: 'Hi-fi & protótipo', v: 'Protótipos de alta fidelidade em Figma, validados com testes de usabilidade.' },
      { n: '05', k: 'Backend', v: 'Acompanho a definição de regras de negócio e tabelas. Decisão de design impacta modelagem de dados.' },
      { n: '06', k: 'Frontend QA', v: 'Acompanho a implementação. Microinteração tem que estar à altura do produto.' },
    ],
  },
  experience: {
    title: 'Experiência',
    items: [
      {
        period: 'Jan. 2023 – Atual',
        company: 'Universidade de Fortaleza',
        role: 'Product Designer — Sistemas Financeiro e Acadêmico',
        place: 'Fortaleza, Brasil',
        bullets: [
          'Redesenho dos fluxos de faturamento, boletos, gestão de inadimplência e requerimentos digitais — para equipes internas e estudantes.',
          'Conduzi testes de usabilidade com staff e alunos, refinando jornadas, formulários e telas a partir de uso real.',
          'Parceria com a Diretoria de Planejamento para alinhar produto e processo institucional.',
          'Contribuo na criação e manutenção do design system interno da Universidade.',
        ],
      },
      {
        period: 'Jul. 2024 – Set. 2025',
        company: 'Procuradoria-Geral do Estado do Ceará (PGE-CE)',
        role: 'Freelance Product Designer — Plataforma LICIA',
        place: 'Remoto',
        bullets: [
          'Design da LICIA, plataforma de gestão de licitações públicas — fluxos de criação, monitoramento e impugnação.',
          'Fluxos e interfaces para geração, edição e rastreio de documentos, com preenchimento automático e reuso de dados.',
          'Protótipos hi-fi e specs de UI (grids e componentes) que sustentaram desenvolvimento e padronização visual.',
        ],
      },
      {
        period: 'Nov. 2019 – Jan. 2022',
        company: 'Trílogo',
        role: 'Operations Lead',
        place: 'Fortaleza, Brasil',
        bullets: [
          'Liderei operações de manutenção de 230+ lojas clientes, coordenando equipes internas, fornecedores e cronogramas de visita preventiva.',
        ],
      },
    ],
  },
  education: {
    title: 'Formação',
    items: [
      { period: '2025.2 – 2027.1', school: 'Universidade de Fortaleza', degree: 'MBA em Design de Produto Digital', kind: 'Pós-graduação Lato Sensu' },
      { period: '2018.2 – 2025.1', school: 'Universidade de Fortaleza', degree: 'Engenharia de Produção', kind: 'Bacharelado' },
    ],
  },
  skills: {
    title: 'Skills & Stack',
    groups: [
      { k: 'Design', v: 'UX/UI · Product Discovery · Arquitetura de informação · Design systems · Handoff' },
      { k: 'Pesquisa', v: 'Entrevistas · Testes de usabilidade · User flows' },
      { k: 'Ferramentas', v: 'Figma · FigJam · Miro · Notion · Jira · Trello' },
      { k: 'Processo', v: 'Scrum · Kanban · Discovery contínuo' },
    ],
  },
  langs: {
    title: 'Idiomas',
    items: [
      { k: 'Português', v: 'Nativo' },
      { k: 'Inglês', v: 'Fluente' },
      { k: 'Espanhol', v: 'Intermediário' },
    ],
  },
  contact: {
    title: 'Contato',
    cta: 'Vamos conversar?',
    cv: 'Baixar CV (PDF)',
    portfolio: 'Ver trabalhos',
  },
  footer: { sig: 'Desenhado e implementado por Zé' },
};

export const EN: Translations = {
  meta: { lang: 'EN', other: 'PT' },
  nav: { home: 'Home', projects: 'Projects', about: 'About', contact: 'Contact' },
  hero: {
    subtitle: 'You can call me',
    nameShort: 'Zé.',
    role: 'Product Designer',
    intro: [
      { lead: 'Designer and Industrial Engineer focused on building complex systems,', em: ' from requirements gathering to handoff.' },
      { lead: 'Currently responsible for transforming the ', em: 'financial and academic systems of University of Fortaleza.' },
      { lead: 'Directly involved in the creation and development of the public procurement management platform of the ', em: 'Procuradoria Geral do Estado do Ceará (PGE-CE).' },
    ],
    location: 'Brazil — available for remote work and travel',
    available: 'Transforming University of Fortaleza',
    contactCta: 'Click here',
    contactSuffix: ' and let\'s talk!',
  },
  bio: {
    title: 'About',
    p1: "I started my career leading maintenance operations across 230+ client stores, coordinating teams, vendors and schedules. That's where I learned that good product is product that works at scale — and that process is the raw material of design.",
    p2: "Today I design systems people actually use to do their jobs: financial, academic and public-procurement platforms. I work close to institutional stakeholders, turning dense business rules into flows that make sense to whoever is on the other side of the screen.",
    p3: "My Industrial Engineering background gives me a systems-thinking toolkit — process modeling, bottlenecks, indicators — that I apply to product decisions every day.",
  },
  what: {
    title: 'How I work',
    items: [
      { k: 'Requirements', v: 'By aligning user pains with stakeholder goals, I translate complex business rules into clear requirements before starting ideation.' },
      { k: 'Flowcharts', v: 'By connecting user journeys with service blueprints, I map how possible on-screen actions ripple through the system as a whole.' },
      { k: 'Wireframes', v: 'By building mid-fidelity structures, I mainly validate component hierarchy and the practical scope of the solution directly with the team.' },
      { k: 'Hi-fi & prototyping', v: 'By modeling responsive and native interfaces, I build interactive prototypes that accurately simulate the product\'s real behavior.' },
      { k: 'Usability testing', v: 'By running qualitative and quantitative tests with real users, I spot journey bottlenecks and refine flow usability based on behavioral data.' },
      { k: 'Dev validation', v: 'During handoff to the dev team, I review component logic and database rules to mitigate risks and ensure code feasibility.' },
    ],
  },
  process: {
    title: 'How I work',
    steps: [
      { n: '01', k: 'Requirements', v: 'I gather requirements with stakeholders and users. I map the institutional process before drawing any pixel.' },
      { n: '02', k: 'Flowcharts', v: 'I map user journeys and system flows — where decisions happen, where data enters and leaves.' },
      { n: '03', k: 'Wireframes', v: 'Structure before aesthetics. I define information architecture and validate fast with the team.' },
      { n: '04', k: 'Hi-fi & prototype', v: 'High-fidelity prototypes in Figma, validated through usability testing.' },
      { n: '05', k: 'Backend', v: 'I follow the definition of business rules and database tables. Design decisions shape data modeling.' },
      { n: '06', k: 'Frontend QA', v: "I follow implementation closely. Microinteractions have to match the product's level of craft." },
    ],
  },
  experience: {
    title: 'Experience',
    items: [
      {
        period: 'Jan. 2023 – Present',
        company: 'Universidade de Fortaleza',
        role: 'Product Designer — Financial & Academic Systems',
        place: 'Fortaleza, Brazil',
        bullets: [
          'Redesigned flows for invoicing, boletos, delinquency management and digital requests — for both internal teams and students.',
          'Conducted usability tests with staff and students, refining journeys, forms and screens based on real-world use.',
          'Partnered with the Planning Directorate to align product and institutional process.',
          "Contributed to the creation and maintenance of the University's internal design system.",
        ],
      },
      {
        period: 'Jul. 2024 – Sep. 2025',
        company: 'Procuradoria-Geral do Estado do Ceará (PGE-CE)',
        role: 'Freelance Product Designer — LICIA Platform',
        place: 'Remote',
        bullets: [
          'Designed LICIA, a public-procurement management platform — flows for creating, monitoring and challenging bidding processes.',
          'Flows and interfaces for generating, editing and tracking documents, with automated filling and reuse of registered data.',
          'Hi-fi prototypes and UI specs (grids and components) that supported development and visual standardization.',
        ],
      },
      {
        period: 'Nov. 2019 – Jan. 2022',
        company: 'Trílogo',
        role: 'Operations Lead',
        place: 'Fortaleza, Brazil',
        bullets: [
          'Led maintenance operations across 230+ client stores, coordinating internal teams, service providers and preventive-visit schedules.',
        ],
      },
    ],
  },
  education: {
    title: 'Education',
    items: [
      { period: '2025.2 – 2027.1', school: 'Universidade de Fortaleza', degree: 'MBA in Digital Product Design', kind: 'Postgraduate Lato Sensu' },
      { period: '2018.2 – 2025.1', school: 'Universidade de Fortaleza', degree: 'Industrial Engineering', kind: "Bachelor's Degree" },
    ],
  },
  skills: {
    title: 'Skills & Stack',
    groups: [
      { k: 'Design', v: 'UX/UI · Product discovery · Information architecture · Design systems · Handoff' },
      { k: 'Research', v: 'Interviews · Usability testing · User flows' },
      { k: 'Tools', v: 'Figma · FigJam · Miro · Notion · Jira · Trello' },
      { k: 'Process', v: 'Scrum · Kanban · Continuous discovery' },
    ],
  },
  langs: {
    title: 'Languages',
    items: [
      { k: 'Portuguese', v: 'Native' },
      { k: 'English', v: 'Fluent' },
      { k: 'Spanish', v: 'Intermediate' },
    ],
  },
  contact: {
    title: 'Contact',
    cta: "Let's talk?",
    cv: 'Download CV (PDF)',
    portfolio: 'See work',
  },
  footer: { sig: 'Designed and implemented by Zé' },
};

export const CONTACT = {
  email: 'zeaugusto.designer@gmail.com',
  phone: '+55 (XX) XXXXX-XXXX',
  linkedin: 'https://linkedin.com/in/joseaugustomarinho',
  portfolio: 'https://zedesign.cc',
};
