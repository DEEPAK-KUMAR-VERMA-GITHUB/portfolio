'use client';

import NeonBorder from '@/components/hero/NeonBorder';
import { Badge } from '@/components/ui/badge';
import { categories, projects } from '@/constants/constants';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import { useState } from 'react';

export default function Project() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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
            <span className="text-purple-400 font-semibold"> problem-solving</span>, and modern web technologies.
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.95 }}
              >
                <NeonBorder
                  className="h-full grid grid-flow-row overflow-hidden transform transition-all duration-500 group"
                  glowColor="cyan"
                >
                  <div className="relative overflow-hidden   ">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-52 object-cover aspect-video "
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {project.featured && (
                      <motion.div
                        className="absolute top-3 right-3"
                        animate={{
                          boxShadow: [
                            '0 0 0 rgba(255, 215, 0, 0)',
                            '0 0 20px rgba(255, 215, 0, 0.6)',
                            '0 0 0 rgba(255, 215, 0, 0)',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          >
                            <Star className="w-3.5 h-3.5 fill-black" />
                          </motion.div>
                          Featured
                        </Badge>
                      </motion.div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col ">
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white/70 text-sm mb-4 flex-grow text-justify line-clamp-4 ">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6 items-center justify-center ">
                      {project.techStack.map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.05 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          <Badge className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-white">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-black/40 border border-white/20 text-white text-sm font-medium rounded-lg hover:border-cyan-400/50 transition-all duration-300 flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </motion.a>
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 text-white text-sm font-medium rounded-lg hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </motion.a>
                    </div>
                  </div>
                </NeonBorder>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
