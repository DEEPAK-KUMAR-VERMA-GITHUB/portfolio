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
  id?: string;
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'language' | 'database' | 'others';
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Achievement {
  title: string;
  issuer: string;
  date: Date;
  icon: string;
  description: string;
}

export interface TimelineItem {
  id?: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  type: 'education' | 'experience' | 'project' | 'certification';
  icon?: React.ReactNode;
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

export type ContactStatus = 'new' | 'in-progress' | 'resolved' | 'spam';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
  labels?: string[];
  metadata?: {
    ip?: string;
    userAgent?: string;
    referrer?: string;
    [key: string]: any;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  icon: string;
  image: string;
  verified: boolean;
  verifyUrl: string;
  description: string;
}
