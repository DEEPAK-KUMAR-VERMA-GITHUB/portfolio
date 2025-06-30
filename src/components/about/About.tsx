'use client';

import NeonBorder from '@/components/hero/NeonBorder';
import { HeartHandshake, Lightbulb, Terminal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { skills } from '@/constants/constants';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function About() {
  const [boxHeight, setBoxHeight] = useState<number>(500);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const calculateHeight = () => {
    if (leftRef.current && rightRef.current) {
      const leftHeight = leftRef.current.getBoundingClientRect().height;
      const rightHeight = rightRef.current.getBoundingClientRect().height;
      const maxHeight = Math.max(leftHeight, rightHeight);
      setBoxHeight(maxHeight);
    }
  };
  useEffect(() => {
    window.addEventListener('resize', calculateHeight);

    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 ">
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 h-48 bg-cyan-500/20 rounded-full filter blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full filter blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-pink-500/20 rounded-full filter blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>
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
            <span>About Me</span>
          </motion.h2>
          <motion.p
            className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            I'm a dedicated MCA student with a passion for{' '}
            <span className="text-cyan-400 font-semibold">full-stack development</span>. My journey in computer
            applications has equipped me with strong{' '}
            <span className="text-purple-400 font-semibold">problem-solving skills</span> and a deep understanding of
            modern web technologies.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center ">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <NeonBorder className="transform hover:scale-[1.02] transition-transform duration-300" glowColor="cyan">
              <div className="p-8 flex flex-col justify-evenly " ref={leftRef} style={{ minHeight: boxHeight }}>
                <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <Lightbulb className="w-8 h-8 text-cyan-400" />
                  </motion.div>
                  My Journey
                </h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  Starting my journey with a Bachelor's in Computer Applications, I discovered my passion for{' '}
                  <span className="text-cyan-400 font-semibold">web development</span> during my undergraduate studies.
                  Now pursuing my Master's degree, I'm focused on becoming a proficient
                  <span className="text-purple-400 font-semibold"> full-stack developer</span>.
                </p>
                <p className="text-white/70 mb-6 leading-relaxed">
                  I believe in <span className="text-pink-400 font-semibold">continuous learning</span> and staying
                  updated with the latest technologies. My goal is to create impactful digital solutions that solve
                  real-world problems.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex flex-wrap justify-center gap-3">
                    {['Problem Solving', 'Team Collaboration', 'Quick Learner', 'Detail Oriented', 'Innovative'].map(
                      (trait, index) => (
                        <motion.div
                          key={trait}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="flex flex-col items-center"
                        >
                          <Badge className="px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-white hover:border-cyan-400/60 transition-all duration-300">
                            <HeartHandshake className="w-4 h-4 mr-2" />
                            {trait}
                          </Badge>
                        </motion.div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </NeonBorder>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <NeonBorder className="transform hover:scale-[1.02] transition-transform duration-300" glowColor="purple">
              <div className="p-8 flex flex-col justify-evenly " ref={rightRef} style={{ minHeight: boxHeight }}>
                <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white flex items-center gap-3">
                  <motion.div
                    animate={{
                      rotateY: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Terminal className="w-8 h-8 text-purple-400" />
                  </motion.div>
                  Skills & Technologies
                </h3>
                <Tabs defaultValue="frontend" className="w-full">
                  <TabsList className="grid w-full grid-cols-6 bg-black/40 rounded-lg p-1 mb-4 border border-white/10">
                    <TabsTrigger
                      value="frontend"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-cyan-400/30 rounded-md transition-all duration-300 text-white/70"
                    >
                      Frontend
                    </TabsTrigger>
                    <TabsTrigger
                      value="backend"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-500/20 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-purple-400/30 rounded-md transition-all duration-300 text-white/70"
                    >
                      Backend
                    </TabsTrigger>
                    <TabsTrigger
                      value="language"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-pink-400/30 rounded-md transition-all duration-300 text-white/70"
                    >
                      Language
                    </TabsTrigger>
                    <TabsTrigger
                      value="framework"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-pink-400/30 rounded-md transition-all duration-300 text-white/70"
                    >
                      Framework
                    </TabsTrigger>
                    <TabsTrigger
                      value="database"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-pink-400/30 rounded-md transition-all duration-300 text-white/70"
                    >
                      Database
                    </TabsTrigger>
                    <TabsTrigger
                      value="tools"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-pink-400/30 rounded-md transition-all duration-300 text-white/70"
                    >
                      Tools
                    </TabsTrigger>
                  </TabsList>

                  {['frontend', 'backend', 'language', 'framework', 'database', 'tools'].map(category => (
                    <TabsContent key={category} value={category} className="space-y-5 pt-2">
                      {skills
                        .filter(skill => skill.category === category)
                        .map((skill, index) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="flex justify-between mb-2">
                              <span className="text-base font-medium text-white">{skill.name}</span>
                              <span className="text-sm text-white/60">{skill.level}%</span>
                            </div>
                            <div className="relative">
                              <Progress
                                value={skill.level}
                                className="h-2.5 bg-white/10 rounded-full overflow-hidden"
                              />
                              <motion.div
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                              />
                            </div>
                          </motion.div>
                        ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </NeonBorder>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
