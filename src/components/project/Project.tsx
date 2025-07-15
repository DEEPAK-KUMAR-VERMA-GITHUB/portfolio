'use client';

import NeonBorder from '@/components/hero/NeonBorder';
import { Badge } from '@/components/ui/badge';
import { categories, projects } from '@/constants/constants';
import { useLandingPageContext } from '@/contexts/landing-page-context';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import { useState } from 'react';
import { ProjectCard } from './ProjectCard';

export default function Project() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { projects } = useLandingPageContext();

  const filteredProjects =
    selectedCategory === 'all' ? projects : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
            whileInView={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span>Featured Projects</span>
          </motion.h2>
          <motion.p
            className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Here are some of my recent projects that showcase my skills in{' '}
            <span className="text-cyan-400 font-semibold">full-stack development</span>,
            <span className="text-purple-400 font-semibold"> problem-solving</span>, and{' '}
            <span className="text-pink-400 font-semibold">modern web technologies</span>.
          </motion.p>
        </motion.div>

        {/* Project Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full text-base font-medium transition-all duration-300 relative overflow-hidden
                  ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-400/50'
                      : 'bg-black/40 text-white/70 border border-white/20 hover:border-cyan-400/50 hover:text-white'
                  }
                `}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {selectedCategory === category.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20"
                  layoutId="activeCategory"
                  transition={{ duration: 0.3 }}
                />
              )}
              <span className="relative z-10">{category.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-8 ">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
