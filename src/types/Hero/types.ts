export interface Particles {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  category: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

export interface Achievement {
  title: string;
  issuer: string;
  date: string;
  icon: string;
  description: string;
}

export interface TimelineItem {
  title: string;
  organization: string;
  period: string;
  description: string;
  type: 'education' | 'experience' | 'project';
}
