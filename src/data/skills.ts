export type SkillLevel = 'familiar' | 'working' | 'strong'

export type Skill = {
  name: string
  level: SkillLevel
}

export type SkillCategory = {
  id: string
  command: string
  label: { pt: string; en: string }
  items: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    command: 'ls backend/',
    label: { pt: 'Backend', en: 'Backend' },
    items: [
      { name: 'PHP', level: 'strong' },
      { name: 'Laravel', level: 'strong' },
      { name: 'Node', level: 'strong' },
      { name: 'APIs REST', level: 'strong' },
      { name: 'MVC', level: 'strong' },
    ],
  },
  {
    id: 'frontend',
    command: 'ls frontend/',
    label: { pt: 'Frontend', en: 'Frontend' },
    items: [
      { name: 'HTML', level: 'strong' },
      { name: 'CSS', level: 'strong' },
      { name: 'JavaScript', level: 'strong' },
      { name: 'Bootstrap', level: 'working' },
      { name: 'Tailwind', level: 'working' },
      { name: 'DataTables', level: 'working' },
    ],
  },
  {
    id: 'database',
    command: 'ls database/',
    label: { pt: 'Banco de Dados', en: 'Database' },
    items: [
      { name: 'MySQL', level: 'strong' },
      { name: 'SQLite', level: 'working' },
      { name: 'Oracle', level: 'familiar' },
      { name: 'SQL', level: 'strong' },
    ],
  },
  {
    id: 'tools',
    command: 'ls tools/',
    label: { pt: 'Ferramentas', en: 'Tools' },
    items: [
      { name: 'Git', level: 'strong' },
      { name: 'GitHub', level: 'strong' },
      { name: 'GitLab', level: 'strong' },
      { name: 'Firebase', level: 'working' },
      { name: 'Supabase', level: 'working' },
    ],
  },
]

export const levelDots: Record<SkillLevel, number> = {
  familiar: 1,
  working: 2,
  strong: 3,
}
