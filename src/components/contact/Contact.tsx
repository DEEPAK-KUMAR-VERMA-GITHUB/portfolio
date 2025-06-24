'use client';

import NeonBorder from '@/components/hero/NeonBorder';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Github, Lightbulb, Linkedin, Mail, MapPin, Phone, Zap } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-400 to-purple-400"
            whileInView={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span>Get In Touch</span>
          </motion.h2>
          <motion.p
            className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            I'm always open to discussing <span className="text-green-400 font-semibold">new opportunities</span>,
            <span className="text-blue-400 font-semibold"> collaborations</span>, or just having a chat about
            technology.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center ">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <NeonBorder className="transform hover:scale-[1.02] transition-transform duration-300" glowColor="green">
              <div className="p-8 flex flex-col gap-10">
                <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-white flex items-center gap-3">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Lightbulb className="w-8 h-8 text-green-400" />
                  </motion.div>
                  Contact Information
                </h3>
                <div className="space-y-10 text-lg">
                  {[
                    { icon: Mail, text: 'boostyourselfup@gmail.com', color: 'text-green-400' },
                    { icon: Phone, text: '+91 7541802720', color: 'text-blue-400' },
                    { icon: MapPin, text: 'Ramgarh, Kaimur, Bihar, India, 821110', color: 'text-purple-400' },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4 text-white"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      >
                        <item.icon className={`w-6 h-6 ${item.color} flex-shrink-0`} />
                      </motion.div>
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10">
                  <h4 className="text-2xl font-bold mb-5 text-white">Follow Me</h4>
                  <div className="flex gap-4">
                    {[
                      { icon: Github, href: 'https://github.com', color: 'from-gray-400 to-gray-600' },
                      { icon: Linkedin, href: 'https://linkedin.com', color: 'from-blue-400 to-blue-600' },
                      { icon: Mail, href: 'mailto:john.doe@email.com', color: 'from-green-400 to-green-600' },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${social.color} flex items-center justify-center text-white transition-all duration-300`}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          boxShadow: [
                            '0 0 0 rgba(255, 255, 255, 0)',
                            '0 0 20px rgba(255, 255, 255, 0.3)',
                            '0 0 0 rgba(255, 255, 255, 0)',
                          ],
                        }}
                        transition={{
                          boxShadow: { duration: 2, repeat: Infinity, delay: index * 0.5 },
                        }}
                      >
                        <social.icon className="w-6 h-6" />
                      </motion.a>
                    ))}
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
            <NeonBorder className="transform hover:scale-[1.02] transition-transform duration-300" glowColor="blue">
              <div className="p-8">
                <div className="pb-6">
                  <h3 className="text-3xl font-bold text-white">Send a Message</h3>
                  <p className="text-white/70 text-base">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </p>
                </div>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label htmlFor="name" className="text-sm font-medium mb-2 block text-white">
                        Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        className="h-12 text-base bg-black/40 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-400/50 focus:ring-cyan-400/20"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label htmlFor="email" className="text-sm font-medium mb-2 block text-white">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="h-12 text-base bg-black/40 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-400/50 focus:ring-cyan-400/20"
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label htmlFor="subject" className="text-sm font-medium mb-2 block text-white">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="What's this about?"
                      className="h-12 text-base bg-black/40 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-400/50 focus:ring-cyan-400/20"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label htmlFor="message" className="text-sm font-medium mb-2 block text-white">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell me more about your project or inquiry..."
                      rows={6}
                      className="resize-none text-base bg-black/40 border-white/20 text-white placeholder:text-white/40 focus:border-cyan-400/50 focus:ring-cyan-400/20"
                    />
                  </motion.div>
                  <motion.button
                    type="submit"
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Zap className="h-5 w-5" />
                    </motion.div>
                    Send Message
                  </motion.button>
                </form>
              </div>
            </NeonBorder>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
