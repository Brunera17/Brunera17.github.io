export interface SocialLink {
  label: string
  url: string
}

export interface Profile {
  name: string
  role: string
  currentJob: string
  headline: string
  intro: string
  about: string[]
  avatarUrl: string
  location?: string
  email: string
  githubUser: string
  socials: SocialLink[]
  highlights: { value: string; label: string }[]
}

export type ProjectStatus = 'producao' | 'desenvolvimento' | 'publico' | 'privado' | 'estudo'

export interface Project {
  slug: string
  title: string
  summary: string
  problem?: string
  highlights: string[]
  stack: string[]
  status: ProjectStatus
  featured: boolean
  repoUrl?: string
  liveUrl?: string
}

export interface Experience {
  role: string
  company: string
  period?: string
  description: string
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface Education {
  course: string
  institution: string
  period: string
}

export interface Certification {
  title: string
  hours: number
  url: string
  group: string
}

export interface Award {
  title: string
  detail: string
}
