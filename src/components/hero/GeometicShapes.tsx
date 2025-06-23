import { motion } from 'framer-motion';
import { FC } from 'react';

const GeometricShapes: FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none ">
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 border border-cyan-400/20 rounded-full"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-16 h-16 border border-purple-400/20"
        animate={{
          rotate: -360,
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-pink-400/10 to-cyan-400/10 rounded-full blur-sm"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-40 w-8 h-8 border border-yellow-400/30 rotate-45"
        animate={{
          rotate: [45, 405],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

export default GeometricShapes;
