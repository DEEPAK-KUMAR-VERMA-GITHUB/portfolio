export interface Particles {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  category: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  status: 'draft' | 'published';
  createdAt: string;
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
  id?: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  type: 'education' | 'experience' | 'project';
  icon?: React.ReactNode; // Optional custom icon component
}

export interface Resume {
  id?: string;
  title: string;
  fileUrl: string;
  fileSize: string;
  fileType: string;
  isDefault: boolean;
  lastUpdated: string;
  description?: string;
  version?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Technology {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  icon?: string;
  website?: string;
  description?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Label {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  textColor: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  label: string;
}
