'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string | null;
  bio: string | null;
  about: string | null;
  journey: string | null;
  professionalTitles: string[];
  githubUrl: string | null;
  linkedInUrl: string | null;
  mailLink: string | null;
  location: string | null;
  image: string | null;
  tags: string[];
};

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  category: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
};

type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
};

type TimeLine = {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  type: string;
  current: boolean;
};

type Achievement = {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  issuer: string;
};

type Resume = {
  id: string;
  name: string;
  type: string;
  url: string;
  isDefault: boolean;
};

type Certification = {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  issuer: string;
  image: string;
  verified: boolean;
  verifyUrl: string;
};

type LandingPageData = {
  user: User | null;
  projects: Project[];
  skills: Skill[];
  timeline: TimeLine[];
  achievements: Achievement[];
  isLoading: boolean;
  error: string | null;
  resume: Resume | null;
  certifications: Certification[];
};

const LandingPageContext = createContext<LandingPageData>({
  user: null,
  projects: [],
  skills: [],
  timeline: [],
  achievements: [],
  isLoading: false,
  error: null,
  resume: null,
  certifications: [],
});

export const LandingPageProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<LandingPageData>({
    user: null,
    projects: [],
    skills: [],
    timeline: [],
    achievements: [],
    resume: null,
    certifications: [],
    isLoading: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setData({ ...data, isLoading: true });
    try {
      const response = await fetch('/api/landing');
      const data = await response.json();
      setData({ ...data, isLoading: false });
    } catch (error) {
      console.error('Error fetching landing page data:', error);
      setData({ ...data, error: 'Failed to fetch landing page data', isLoading: false });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const contextValue: LandingPageData = {
    ...data,
    isLoading: data.isLoading,
    error: data.error,
  };

  return <LandingPageContext.Provider value={contextValue}>{children}</LandingPageContext.Provider>;
};

export const useLandingPageContext = () => {
  const context = useContext(LandingPageContext);

  if (!context) {
    throw new Error('useLandingPageContext must be used within a LandingPageProvider');
  }

  return context;
};
