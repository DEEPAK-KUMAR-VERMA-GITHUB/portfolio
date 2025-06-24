'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/10 bg-black/60 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.p
            className="text-white/60 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            © {new Date().getFullYear()} Deepak Kumar Verma. All rights reserved.
          </motion.p>
          <motion.div
            className="mt-4 flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.a
              href="#"
              className="text-white/60 hover:text-cyan-400 transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
            >
              Privacy Policy
            </motion.a>
            <div className="h-4 w-px bg-white/20" />
            <motion.a
              href="#"
              className="text-white/60 hover:text-purple-400 transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
            >
              Terms of Service
            </motion.a>
          </motion.div>

          {/* Floating footer decoration */}
          <motion.div
            className="mt-6 flex justify-center"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full" />
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
