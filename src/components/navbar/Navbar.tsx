'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Atom, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navbarSections = ['Home', 'About', 'Projects', 'Achievements', 'Resume', 'Contact'];

export const scrollToSection = (section: string) => {
  const element = document.getElementById(section);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Navbar = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const handleSectionClick = (section: string) => {
    setActiveSection(section);
    scrollToSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center gap-2 relative z-10"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
              <Atom className="w-6 h-6 text-cyan-400" />
            </motion.div>
            <span>Deepak Kumar Verma</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 relative z-10">
            {navbarSections.map((section, index) => (
              <motion.button
                key={section}
                onClick={() => handleSectionClick(section.toLowerCase())}
                className={`relative text-sm font-semibold transition-all duration-300 group
                    ${activeSection === section.toLowerCase() ? 'text-cyan-400' : 'text-white/70 hover:text-white'}
                  `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {section}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-400"
                  initial={{ width: 0 }}
                  animate={{ width: activeSection === section.toLowerCase() ? '100%' : 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
                {activeSection === section.toLowerCase() && (
                  <motion.div
                    className="absolute inset-0 bg-cyan-400/10 rounded-lg rounded-b-none -z-10 py-3 px-6 -top-2 -left-1 "
                    layoutId="activeNavItem"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white hover:text-cyan-400 transition-colors relative z-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div animate={{ rotate: mobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="md:hidden py-4 space-y-2 border-t border-white/10 bg-black/40 backdrop-blur-xl"
            >
              {navbarSections.map((section, index) => (
                <motion.button
                  key={section}
                  onClick={() => handleSectionClick(section.toLowerCase())}
                  className="block w-full text-left px-4 py-3 text-base font-medium text-white hover:bg-white/10 rounded-lg transition-colors relative group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <span className="relative z-10">{section}</span>
                  <motion.div
                    className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
