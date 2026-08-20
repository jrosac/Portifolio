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
    image: '/projects/portifolio.png',
    liveUrl: 'https://portifolio-opal.vercel.app/',
    githubUrl: 'https://github.com/jrosac/Portifolio',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    name: {
      pt: 'Portfólio Terminal',
      en: 'Terminal Portfolio',
    },
    summary: {
      pt: 'Este site — portfólio em estética de terminal, bilíngue e interativo.',
      en: 'This site — a bilingual, interactive terminal-style portfolio.',
    },
    description: {
      pt: 'Página única com identidade de terminal: inicialização, prompt com comandos (about, skills, projects, contact), navegação por teclado e por cliques, troca PT/EN e apresentação de projetos em janela. Feito com React, TypeScript, Vite e Tailwind.',
      en: 'A single-page portfolio with a terminal identity: boot sequence, a command prompt (about, skills, projects, contact), keyboard and click navigation, PT/EN toggle, and project details in a modal. Built with React, TypeScript, Vite and Tailwind.',
    },
    features: {
      pt: [
        'Prompt interativo com comandos',
        'Interface bilíngue PT/EN',
        'Sequência de inicialização e animações leves',
        'Listagem de projetos em estilo terminal',
        'Layout responsivo',
      ],
      en: [
        'Interactive command prompt',
        'Bilingual PT/EN interface',
        'Boot sequence and light animations',
        'Terminal-style project listing',
        'Responsive layout',
      ],
    },
  },
  {
    id: '02',
    featured: true,
    image: '/projects/finControl.png',
    liveUrl: null,
    githubUrl: 'https://github.com/jrosac/Fincontrol',
    technologies: [
      'PHP',
      'Laravel',
      'Bootstrap',
      'SQLite',
      'MySQL',
      'Chart.js',
    ],
    name: {
      pt: 'FinControl',
      en: 'FinControl',
    },
    summary: {
      pt: 'Sistema de gerenciamento financeiro com permissões, relatórios e importação.',
      en: 'Financial management system with permissions, reports and imports.',
    },
    description: {
      pt: 'Aplicação Laravel para controlar receitas, despesas, contas, cartões, parcelas e metas. Tem papéis de acesso (administrador e operador), fluxo de caixa com filtros, relatórios comparativos e importação/exportação em CSV, Excel e PDF.',
      en: 'A Laravel app to track income, expenses, accounts, cards, installments and goals. It includes access roles (admin and operator), filtered cash flow, comparative reports, and CSV, Excel and PDF import/export.',
    },
    features: {
      pt: [
        'Autenticação e permissões (admin / operador)',
        'Receitas, despesas, transferências e parcelas',
        'Contas, cartões, categorias e metas',
        'Fluxo de caixa com filtros e exportação',
        'Relatórios mensais, anuais e comparativos',
        'Importação CSV/Excel com relatório de erros',
      ],
      en: [
        'Auth and permissions (admin / operator)',
        'Income, expenses, transfers and installments',
        'Accounts, cards, categories and goals',
        'Cash flow with filters and export',
        'Monthly, yearly and comparative reports',
        'CSV/Excel import with error reporting',
      ],
    },
  },
  {
    id: '03',
    featured: true,
    image: '#',
    liveUrl: null,
    githubUrl: 'https://github.com/jrosac/Cripto-analyze',
    technologies: ['React', 'TypeScript', 'Vite', 'React Router'],
    name: {
      pt: 'Cripto Analyze',
      en: 'Cripto Analyze',
    },
    summary: {
      pt: 'Página responsiva com cotações de criptomoedas via API.',
      en: 'Responsive page with cryptocurrency quotes from an API.',
    },
    description: {
      pt: 'Aplicação React e TypeScript para consultar criptomoedas em tempo real. Lista preço, valor de mercado, volume e variação em 24h, com busca, paginação e uma tela de detalhes para cada moeda. Feita para praticar DOM, roteamento e consumo de API.',
      en: 'A React and TypeScript app to look up cryptocurrencies in real time. It lists price, market cap, volume and 24h change, with search, pagination and a detail page for each coin. Built to practice the DOM, routing and API consumption.',
    },
    features: {
      pt: [
        'Listagem de criptomoedas via API',
        'Busca e navegação para detalhes',
        'Preço, mercado, volume e variação 24h',
        'Carregar mais resultados',
        'Layout responsivo',
      ],
      en: [
        'Cryptocurrency listing via API',
        'Search and detail navigation',
        'Price, market cap, volume and 24h change',
        'Load more results',
        'Responsive layout',
      ],
    },
  },
]
