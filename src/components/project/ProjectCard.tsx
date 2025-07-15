'use client';

import { FC, useRef } from 'react';
import { motion } from 'framer-motion';
import NeonBorder from '@/components/hero/NeonBorder';
import { Project } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Star } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.95 }}
      className="max-h-[700px] h-[700px] overflow-hidden"
    >
      <NeonBorder
        className="h-full rounded-lg grid grid-flow-row overflow-hidden transition-all duration-500 group"
        glowColor="cyan"
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <motion.img
            src={project.image || '@/no-image.png'}
            alt={project.title}
            className="w-full h-52 object-cover aspect-video"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {project.featured && (
            <motion.div
              className="absolute top-3 right-3 rounded-full"
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
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                  <Star className="w-3.5 h-3.5 fill-black" />
                </motion.div>
                Featured
              </Badge>
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col h-[calc(100%-12rem)]">
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-white/70 text-sm mb-4 text-justify line-clamp-8">{project.description}</p>

          {/* Badge + Buttons */}
          <div className="flex flex-col h-[230px]">
            {/* Tech Stack Badge Scrollable Area */}
            <div className="flex gap-2 flex-wrap justify-center max-h-[160px] overflow-y-auto scrollbar-hide">
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

            {/* Spacer to push buttons to bottom */}
            {/* <div className="flex-grow" /> */}

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              {project.githubUrl && (
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
              )}
              {project.liveUrl && (
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
              )}
            </div>
          </div>
        </div>
      </NeonBorder>
    </motion.div>
  );
};
