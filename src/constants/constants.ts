import { Achievement, Certification, Project, Skill, TimelineItem } from '@/types/types';
import { COLORS } from './colors';

export const COLORS_TOP = [COLORS.TEAL, COLORS.BLUE, COLORS.PURPLE, COLORS.PINK];

export const skills: Skill[] = [
  { name: 'React', level: 90, category: 'frontend' },
  { name: 'Next.js', level: 85, category: 'frontend' },
  { name: 'TypeScript', level: 80, category: 'frontend' },
  { name: 'Tailwind CSS', level: 95, category: 'frontend' },
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'Express.js', level: 80, category: 'backend' },
  { name: 'MongoDB', level: 75, category: 'backend' },
  { name: 'PostgreSQL', level: 70, category: 'backend' },
  { name: 'Git', level: 90, category: 'tools' },
  { name: 'Docker', level: 65, category: 'tools' },
  { name: 'AWS', level: 60, category: 'tools' },
  { name: 'Figma', level: 75, category: 'tools' },
  { name: 'Prisma', level: 85, category: 'database' },
  { name: 'MongoDB', level: 75, category: 'database' },
  { name: 'PostgreSQL', level: 70, category: 'database' },
  { name: 'MySQL', level: 65, category: 'database' },
  { name: 'JavaScript', level: 90, category: 'language' },
  { name: 'HTML5', level: 95, category: 'language' },
  { name: 'CSS3', level: 90, category: 'language' },
  { name: 'GraphQL', level: 85, category: 'framework' },
  { name: 'Apollo Server', level: 80, category: 'framework' },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.',
    image: '/api/placeholder/400/250',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    category: 'fullstack',
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    featured: true,
    status: 'published',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative task management application with real-time updates using Socket.io and React.',
    image: '/api/placeholder/400/250',
    techStack: ['React', 'Socket.io', 'Node.js', 'PostgreSQL'],
    category: 'fullstack',
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    featured: true,
    status: 'published',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'Beautiful weather dashboard with location-based forecasts and interactive charts.',
    image: '/api/placeholder/400/250',
    techStack: ['Next.js', 'TypeScript', 'Chart.js', 'Weather API'],
    category: 'frontend',
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    featured: false,
    status: 'published',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'REST API Service',
    description: 'Scalable REST API with authentication, rate limiting, and comprehensive documentation.',
    image: '/api/placeholder/400/250',
    techStack: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
    category: 'backend',
    githubUrl: 'https://github.com',
    liveUrl: 'https://demo.com',
    featured: false,
    status: 'published',
    createdAt: new Date().toISOString(),
  },
];

export const achievements: Achievement[] = [
  {
    title: 'Full Stack Web Development',
    issuer: 'Coursera',
    date: '2024',
    icon: '🏆',
    description: 'Completed comprehensive full-stack development course',
  },
  {
    title: 'JavaScript Algorithms',
    issuer: 'HackerRank',
    date: '2024',
    icon: '⭐',
    description: '5-star rating in JavaScript problem solving',
  },
  {
    title: 'React Developer',
    issuer: 'Meta',
    date: '2023',
    icon: '🎯',
    description: 'Professional React development certification',
  },
  {
    title: 'Best Project Award',
    issuer: 'College',
    date: '2023',
    icon: '🥇',
    description: 'Best final year project in computer applications',
  },
  
];

export const timeline: TimelineItem[] = [
  {
    title: 'Master of Computer Applications',
    organization: 'XYZ University',
    period: '2022 - 2024',
    description: 'Specializing in software development and system design. Current CGPA: 8.5/10',
    type: 'education',
  },
  {
    title: 'Full Stack Developer Intern',
    organization: 'Tech Solutions Inc.',
    period: 'Jun 2023 - Aug 2023',
    description: 'Developed web applications using React and Node.js. Contributed to 3 major projects.',
    type: 'experience',
  },
  {
    title: 'Bachelor of Computer Applications',
    organization: 'ABC College',
    period: '2019 - 2022',
    description: 'Graduated with First Class. Strong foundation in programming and database management.',
    type: 'education',
  },
  {
    title: 'E-Commerce Platform',
    organization: 'Final Year Project',
    period: 'Jan 2024 - Present',
    description: 'Building a comprehensive e-commerce solution as final year project.',
    type: 'project',
  },
];

export const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
];

export const certifications: Certification[] = [
  {
    id: '1',
    title: 'Full Stack Web Development',
    issuer: 'Coursera',
    date: '2024',
    icon: '🏆',
    image: 'https://placehold.co/600x400?text=Hello+World+1',
    verified: true,
    verifyUrl: 'https://example.com/verify',
    description: 'Completed comprehensive full-stack development course',
  },
  {
    id: '2',
    title: 'JavaScript Algorithms',
    issuer: 'HackerRank',
    date: '2024',
    icon: '⭐',
    image: 'https://placehold.co/600x400?text=Hello+World+2',
    verified: true,
    verifyUrl: 'https://example.com/verify',
    description: '5-star rating in JavaScript problem solving',
  },
  {
    id: '3',
    title: 'React Developer',
    issuer: 'Meta',
    date: '2023',
    icon: '🎯',
    image: 'https://placehold.co/600x400?text=Hello+World+3',
    verified: true,
    verifyUrl: 'https://example.com/verify',
    description: 'Professional React development certification',
  },
  {
    id: '4',
    title: 'Best Project Award',
    issuer: 'College',
    date: '2023',
    icon: '🥇',
    image: 'https://placehold.co/600x400?text=Hello+World+4',
    verified: true,
    verifyUrl: 'https://example.com/verify',
    description: 'Best final year project in computer applications',
  },
];
