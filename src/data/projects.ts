export type Localized = { pt: string; en: string }

export type Project = {
  id: string
  featured: boolean
  image: string
  liveUrl: string | null
  githubUrl: string | null
  technologies: string[]
  name: Localized
  summary: Localized
  description: Localized
  features: { pt: string[]; en: string[] }
}

export const projects: Project[] = [
  {
    id: '01',
    featured: true,
    image: '/projects/01.svg',
    liveUrl: '#',
    githubUrl: '#',
    technologies: ['PHP', 'Laravel', 'MySQL', 'JavaScript'],
    name: {
      pt: 'Sistema de Gerenciamento',
      en: 'Management System',
    },
    summary: {
      pt: 'Aplicação web para organizar operações, utilizadores e permissões.',
      en: 'Web app to organize operations, users and permissions.',
    },
    description: {
      pt: 'Sistema de gerenciamento com autenticação, papéis de acesso, CRUD completo e relatórios. Placeholder — substitua pela descrição real do projeto.',
      en: 'Management system with authentication, access roles, full CRUD and reports. Placeholder — replace with the real project description.',
    },
    features: {
      pt: ['Autenticação', 'CRUD', 'Permissões', 'Relatórios'],
      en: ['Authentication', 'CRUD', 'Permissions', 'Reports'],
    },
  },
  {
    id: '02',
    featured: true,
    image: '/projects/02.svg',
    liveUrl: '#',
    githubUrl: '#',
    technologies: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
    name: {
      pt: 'Gerenciador Financeiro',
      en: 'Finance Manager',
    },
    summary: {
      pt: 'Controlo de receitas, despesas e visão mensal do fluxo.',
      en: 'Income and expense tracking with a monthly cash-flow view.',
    },
    description: {
      pt: 'Gerenciador financeiro para lançar movimentos, categorizar gastos e acompanhar saldos. Placeholder — substitua pela descrição real do projeto.',
      en: 'Finance manager to record movements, categorize spending and follow balances. Placeholder — replace with the real project description.',
    },
    features: {
      pt: ['Lançamentos', 'Categorias', 'Dashboard', 'Filtros'],
      en: ['Entries', 'Categories', 'Dashboard', 'Filters'],
    },
  },
  {
    id: '03',
    featured: false,
    image: '/projects/03.svg',
    liveUrl: null,
    githubUrl: '#',
    technologies: ['PHP', 'Laravel', 'MySQL'],
    name: {
      pt: 'Sistema de Anexos',
      en: 'Attachments System',
    },
    summary: {
      pt: 'Upload, organização e consulta de ficheiros ligados a registos.',
      en: 'Upload, organize and browse files linked to records.',
    },
    description: {
      pt: 'Módulo de anexos com upload, listagem e associação a entidades. Placeholder — substitua pela descrição real do projeto.',
      en: 'Attachments module with upload, listing and entity association. Placeholder — replace with the real project description.',
    },
    features: {
      pt: ['Upload', 'Listagem', 'Associação a registos', 'Download'],
      en: ['Upload', 'Listing', 'Record association', 'Download'],
    },
  },
  {
    id: '04',
    featured: false,
    image: '/projects/04.svg',
    liveUrl: null,
    githubUrl: '#',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    name: {
      pt: 'Outros projetos',
      en: 'Other projects',
    },
    summary: {
      pt: 'Estudos, protótipos e trabalhos menores em web.',
      en: 'Studies, prototypes and smaller web pieces.',
    },
    description: {
      pt: 'Coleção de experimentos e projetos pontuais. Placeholder — substitua por um projeto real ou um índice de trabalhos.',
      en: 'A collection of experiments and one-off projects. Placeholder — replace with a real project or an index of work.',
    },
    features: {
      pt: ['UI experimental', 'Landing pages', 'Scripts utilitários'],
      en: ['Experimental UI', 'Landing pages', 'Utility scripts'],
    },
  },
]
