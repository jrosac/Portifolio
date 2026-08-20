export type Localized = { pt: string; en: string }

export type ExperienceItem = {
  id: string
  role: Localized
  org: Localized
  period: Localized
  location: Localized
  summary: Localized
  highlights: { pt: string[]; en: string[] }
}

export const experience: ExperienceItem[] = [
  {
    id: 'ditin',
    role: {
      pt: 'Estagiário em Desenvolvimento',
      en: 'Development Intern',
    },
    org: {
      pt: 'Diretoria de Tecnologia da Informação — DITIN',
      en: 'Information Technology Directorate — DITIN',
    },
    period: {
      pt: 'ago. 2025 — atual',
      en: 'Aug 2025 — present',
    },
    location: {
      pt: 'São Cristóvão, Sergipe',
      en: 'São Cristóvão, Sergipe',
    },
    summary: {
      pt: 'Atuo no desenvolvimento de sistemas web para a Prefeitura de São Cristóvão, com foco em backend Laravel e na melhoria de fluxos internos.',
      en: 'I work on web systems for the São Cristóvão city hall, focused on Laravel backends and improving internal workflows.',
    },
    highlights: {
      pt: [
        'Desenvolvimento do sistema de transparência da Prefeitura de São Cristóvão',
        'Organização e otimização de fluxos internos',
        'Programação back-end em PHP (Laravel)',
        'Proposição de melhorias e garantia de qualidade nas soluções desenvolvidas',
      ],
      en: [
        'Development of the São Cristóvão city hall transparency system',
        'Organization and optimization of internal workflows',
        'Backend programming in PHP (Laravel)',
        'Proposing improvements and keeping quality in the solutions we ship',
      ],
    },
  },
  {
    id: 'softeam-assessor',
    role: {
      pt: 'Assessor de Projetos',
      en: 'Project Associate',
    },
    org: {
      pt: 'SofTeam | Empresa Júnior de Computação',
      en: 'SofTeam | Junior Computing Enterprise',
    },
    period: {
      pt: 'jan. 2025 — atual',
      en: 'Jan 2025 — present',
    },
    location: {
      pt: 'Aracaju, Sergipe',
      en: 'Aracaju, Sergipe',
    },
    summary: {
      pt: 'Desenvolvimento de aplicações web para clientes reais da empresa júnior, em equipe e com boas práticas de código.',
      en: 'Building web applications for real junior-enterprise clients, working in a team and following solid development practices.',
    },
    highlights: {
      pt: [
        'Desenvolvimento de aplicações web com HTML, CSS, JavaScript, Java e Spring Boot',
        'Colaboração em equipe utilizando boas práticas de desenvolvimento',
        'Participação em projetos reais voltados para clientes externos',
      ],
      en: [
        'Web apps with HTML, CSS, JavaScript, Java and Spring Boot',
        'Teamwork with solid development practices',
        'Real projects for external clients',
      ],
    },
  },
  {
    id: 'softeam',
    role: {
      pt: 'Diretor de Recursos Humanos',
      en: 'Human Resources Director',
    },
    org: {
      pt: 'SofTeam | Empresa Júnior de Computação',
      en: 'SofTeam | Junior Computing Enterprise',
    },
    period: {
      pt: 'jan. 2024 — mai. 2025',
      en: 'Jan 2024 — May 2025',
    },
    location: {
      pt: 'São Cristóvão, Sergipe',
      en: 'São Cristóvão, Sergipe',
    },
    summary: {
      pt: 'Liderei a área de RH da empresa júnior: pessoas, processos seletivos e documentos, além de comunicação com o time.',
      en: 'I led HR at the junior enterprise: people, recruiting and documents, plus communication with the team.',
    },
    highlights: {
      pt: [
        'Gestão e acompanhamento de equipes',
        'Recrutamento e seleção de novos membros',
        'Elaboração de contratos e documentos institucionais',
        'Desenvolvimento de habilidades de liderança e comunicação',
      ],
      en: [
        'Team management and follow-up',
        'Recruiting and selecting new members',
        'Drafting contracts and institutional documents',
        'Building leadership and communication skills',
      ],
    },
  },
]
