'use client';

import { motion } from 'framer-motion';
import NeonBorder from '@/components/hero/NeonBorder';
import { Briefcase, Code, Download, GraduationCap } from 'lucide-react';
import { timeline } from '@/constants/constants';

export default function Resume() {
  return (
    <section id="resume" className="py-20 relative overflow-hidden bg-black/20">
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
            <span>Resume & Experience</span>
          </motion.h2>
          <motion.p
            className="text-lg text-white/70 max-w-3xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            My <span className="text-cyan-400 font-semibold">educational background</span>,
            <span className="text-purple-400 font-semibold"> professional experience</span>, and key milestones in my
            journey.
          </motion.p>
          <NeonBorder glowColor="cyan" className="w-fit mx-auto">
            <motion.button
              className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white rounded-lg transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <Download className="h-5 w-5" />
              </motion.div>
              Download Full Resume
            </motion.button>
          </NeonBorder>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-10 relative">
            {/* Animated timeline line */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 rounded-full"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className={`flex items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
              >
                <div className="hidden md:block w-1/2"></div>

                {/* Timeline node with icon */}
                <motion.div
                  className="rounded-full absolute left-1/2 transform -translate-x-1/2 md:relative md:left-0 md:right-0 md:translate-x-0 z-10"
                  whileHover={{ scale: 1.2 }}
                  animate={{
                    boxShadow: [
                      '0 0 0 rgba(0, 255, 255, 0)',
                      '0 0 20px rgba(0, 255, 255, 0.6)',
                      '0 0 0 rgba(0, 255, 255, 0)',
                    ],
                  }}
                  transition={{
                    boxShadow: { duration: 2, repeat: Infinity },
                    scale: { duration: 0.3 },
                  }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center shadow-xl border-2 border-black">
                    {item.icon ? (
                      <div className="w-7 h-7 text-white flex items-center justify-center">{item.icon}</div>
                    ) : (
                      <>
                        {item.type === 'education' && <GraduationCap className="w-7 h-7 text-white" />}
                        {item.type === 'experience' && <Briefcase className="w-7 h-7 text-white" />}
                        {item.type === 'project' && <Code className="w-7 h-7 text-white" />}
                      </>
                    )}
                  </div>
                </motion.div>

                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <NeonBorder className="transform hover:scale-[1.02] transition-all duration-300" glowColor="purple">
                    <div className="p-6">
                      <div className="pb-3">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div>
                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                            <p className="text-base text-white/70">{item.organization}</p>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-white rounded-full"
                          >
                            {item.period}
                          </motion.div>
                        </div>
                      </div>
                      <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </NeonBorder>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
