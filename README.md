# Portfólio Terminal — João Rosa Conceição

Portfólio pessoal em formato de **terminal interativo**. Em vez de uma página longa, a navegação acontece por comandos: você digita (ou clica) `help`, `whoami`, `skills`, `projects` ou `contact`, e o conteúdo abre em uma janela.

É uma SPA bilíngue (PT/EN), com estética de terminal moderno — minimalista, escura e inspirada em Linux/macOS — sem visual “hacker”.

**João Rosa Conceição** · Desenvolvedor Full Stack

---

## Tecnologias

| Camada | Tecnologia |
| --- | --- |
| UI | [React 19](https://react.dev/) |
| Linguagem | [TypeScript](https://www.typescriptlang.org/) |
| Build | [Vite](https://vite.dev/) |
| Estilo | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animação | [Framer Motion](https://www.framer.com/motion/) |
| Fonte | [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) |

O site é estático (não tem backend). Conteúdo, habilidades e projetos ficam em arquivos TypeScript em `src/data/`.

---

## Funcionalidades

- Sequência de boot na primeira visita (pode pular; fica salva no `localStorage`)
- Prompt `joao@portfolio:~$` com histórico de comandos
- Janelas (modais) para sobre, tecnologias, projetos e contato
- Interface em **português** e **inglês** (`lang pt` / `lang en`, ou PT/EN no topo)
- Projetos com capa, descrição, stack e link para o GitHub
- Layout pensado para desktop e mobile

### Comandos

**Navegação**

| Comando | O que faz |
| --- | --- |
| `whoami` | Sobre mim |
| `skills` | Tecnologias |
| `projects` | Projetos |
| `experience` | Experiência profissional |
| `contact` | Contato |
| `help` | Lista os comandos |

**Sistema**

| Comando | O que faz |
| --- | --- |
| `clear` | Limpa o histórico e volta à home |
| `lang pt` / `lang en` | Troca o idioma |
| `exit` | Encerrar (mensagem de saída) |

Também dá para clicar nos comandos depois de digitar `help`.

---

## Como rodar

Requisitos: [Node.js](https://nodejs.org/) 20+ e npm.

```bash
npm install
npm run dev
```

O Vite sobe em `http://localhost:5173`.

```bash
npm run build    # gera a pasta dist/
npm run preview  # testa o build localmente
```

---

## Estrutura

```text
src/
  App.tsx                 # shell do terminal, boot e janelas
  data/
    content.ts            # textos PT/EN (sobre, contato, help)
    skills.ts             # categorias e níveis de habilidade
    projects.ts           # projetos exibidos no comando projects
    experience.ts         # experiências profissionais
  components/
    terminal/             # chrome, prompt, banner ASCII, modais
    sections/             # about, skills, projects, contact
    nav/                  # home, help e input de comando
  hooks/useTerminal.ts    # parser e histórico de comandos
  i18n/                   # idioma (localStorage: portfolio-lang)
public/projects/          # capas dos projetos (PNG, SVG, WebP…)
```

---

## Personalizar

| O quê | Onde |
| --- | --- |
| Textos, cargo, contato | `src/data/content.ts` |
| Tecnologias e níveis | `src/data/skills.ts` |
| Projetos | `src/data/projects.ts` |
| Experiência | `src/data/experience.ts` |
| Capas | `public/projects/` — no projeto, use `image: '/projects/arquivo.png'` |

Níveis de habilidade: `familiar` (básico), `working` (intermediário), `strong` (avançado).
