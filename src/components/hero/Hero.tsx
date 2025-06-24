'use client';
import { useMotionTemplate, useMotionValue, motion, animate } from 'framer-motion';
import { COLORS_TOP } from '@/constants/constants';
import FloatingParticles from '@/components/hero/FloatingParticles';
import GeometricShapes from '@/components/hero/GeometicShapes';
import { ChevronDown, Download, Rocket } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import NeonBorder from '@/components/hero/NeonBorder';
import { FiArrowRight } from 'react-icons/fi';
import { scrollToSection } from '@/components/navbar/Navbar';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useEffect, useState } from 'react';

const Hero = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: 'easeInOut',
      duration: 5,
      repeat: Infinity,
      repeatType: 'mirror',
    });
  }, []);

  // Only render WebGL content in the browser
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Animate gradient background */}
        <motion.div className="absolute inset-0" style={{ backgroundImage }} />

        {/* Only render WebGL content in the browser */}
        {mounted && (
          <>
            {/* Floating particles */}
            <FloatingParticles />
            {/* Geometric shapes */}
            <GeometricShapes />
          </>
        )}

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWRHRj0iJWEyNTUiLz4KICA8L2c+Cjwvc3ZnPgo=')] opacity-20" />

        {/* Ambient lighting effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-screen filter blur-[128px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full mix-blend-screen filter blur-[96px] animate-pulse delay-2000" />
      </div>

      {/* Hero section */}
      <motion.section
        id="home"
        style={{ backgroundImage }}
        className="relative grid min-h-screen place-content-center overflow-hidden px-4 py-24 text-white"
      >
        <div className="relative z-10 flex flex-col items-center">
          {/* Floating avatar with neon glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mb-8 relative"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(0, 255, 255, 0.3)',
                  '0 0 40px rgba(138, 43, 226, 0.4)',
                  '0 0 20px rgba(0, 255, 255, 0.3)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-2 border-cyan-400/50 relative"
            >
              <Avatar className="w-full h-full">
                <AvatarImage src="/api/placeholder/160/160" alt="Deepak Kumar Verma" />
                <AvatarFallback className="text-5xl font-bold bg-gradient-to-br from-cyan-400 to-purple-600 text-white">
                  DKV
                </AvatarFallback>
              </Avatar>

              {/* Orbiting particles around avatar */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: `${60 + i * 10}px 0px`,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Glitch name effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="mb-6"
          >
            <span className="max-w-3xl bg-gradient-to-br from-white via-cyan-200 to-purple-200 bg-clip-text text-center text-3xl font-bold leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
              Deepak Kumar Verma
            </span>
          </motion.div>

          {/* Animated subtitle */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {[
              '🚀 Full Stack Developer',
              '🎓 MCA Final Year Student',
              '💻 Competitive Programmer',
              '🎮 Tech Enthusiast',
            ].map((subtitle, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.2, ease: 'easeOut' }}
                className="text-xl md:text-3xl mb-8 font-medium flex items-center gap-1"
              >
                <span className="text-white/80">{subtitle}</span>
                {i !== 3 && (
                  <motion.span
                    className="text-cyan-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    &nbsp;|&nbsp;
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Enhanced description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            className="text-lg text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed text-center"
          >
            Passionate about crafting <span className="text-cyan-400 font-semibold">innovative web solutions</span> and
            exploring
            <span className="text-purple-400 font-semibold"> cutting-edge technologies</span>. Currently pursuing
            Master's in Computer Applications with a focus on full-stack development.
          </motion.p>

          {/* Enhanced CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <NeonBorder glowColor="cyan">
              <motion.button
                style={{ border, boxShadow }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex w-fit items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white font-semibold rounded-lg transition-all duration-300"
                onClick={() => scrollToSection('projects')}
              >
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                  <Rocket className="h-5 w-5" />
                </motion.div>
                Explore My Work
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <FiArrowRight className="h-5 w-5" />
                </motion.div>
              </motion.button>
            </NeonBorder>

            <NeonBorder glowColor="purple">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white font-semibold rounded-lg border border-purple-400/30 transition-all duration-300 flex items-center gap-2"
              >
                <Download className="h-5 w-5" />
                Download Resume
              </motion.button>
            </NeonBorder>
          </motion.div>
        </div>

        <div className="absolute inset-0 z-0">
          <Canvas>
            <Stars radius={50} count={2500} factor={4} fade speed={2} />
          </Canvas>
        </div>

        {/* Animated scroll indicator */}
        <motion.div
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs uppercase tracking-wider">Scroll</span>
          <motion.div
            animate={{ scaleY: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-6 w-6 text-cyan-400" />
          </motion.div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default Hero;
