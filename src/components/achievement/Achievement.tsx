'use client';

import { motion } from 'framer-motion';
import GeometricShapes from '@/components/hero/GeometicShapes';
import NeonBorder from '@/components/hero/NeonBorder';
import { Star } from 'lucide-react';
import { achievements } from '@/constants/constants';

export default function Achievement() {
  return (
    <section id="achievements" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 h-48 bg-yellow-500/20 rounded-full filter blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-orange-500/20 rounded-full filter blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
        <GeometricShapes />
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
            className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"
            whileInView={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span>Achievements & Certifications</span>
          </motion.h2>
          <motion.p
            className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Recognition and certifications that validate my{' '}
            <span className="text-yellow-400 font-semibold">skills</span> and dedication to{' '}
            <span className="text-orange-400 font-semibold">continuous learning</span>.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30, rotateY: -90 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, rotateY: 5 }}
            >
              <NeonBorder className="h-full grid grid-cols-1 transform transition-all duration-500" glowColor="yellow">
                <div className="p-6 text-center h-full flex flex-col justify-between">
                  <div className="pb-4">
                    <motion.div
                      className="text-5xl mb-3 leading-none"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {achievement.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 ">{achievement.title}</h3>
                    <p className="text-sm text-white/60 line-clamp-2">
                      {achievement.issuer} • {achievement.date}
                    </p>
                  </div>
                  <div className="flex-grow flex items-center justify-center line-clamp-2">
                    <p className="text-sm text-white/70 leading-relaxed">{achievement.description}</p>
                  </div>

                  {/* Floating achievement badge */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: 360,
                    }}
                    transition={{
                      scale: { duration: 2, repeat: Infinity },
                      rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                    }}
                  >
                    <Star className="w-3 h-3 text-black fill-black" />
                  </motion.div>
                </div>
              </NeonBorder>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
