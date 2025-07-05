'use client';

import NeonBorder from '@/components/hero/NeonBorder';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLandingPageContext } from '@/contexts/landing-page-context';
import { motion } from 'framer-motion';
import { Github, Lightbulb, Linkedin, Loader2, Mail, MapPin, Phone, Send, Zap } from 'lucide-react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { sendMessage } from './actions';
import { toast } from 'react-hot-toast';

export default function Contact() {
  const { user } = useLandingPageContext();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formSchema = z.object({
    name: z.string().min(3, 'Name is required'),
    email: z.string().email('Invalid email'),
    subject: z.string().min(3, 'Subject is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);

      const result = await sendMessage(data);

      if (result.success) {
        toast.success('Your message has been sent successfully! I will get back to you as soon as possible.');
        form.reset();
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            I'm always open to discussing <span className="text-green-400 font-semibold">new opportunities</span>,{' '}
            <span className="text-blue-400 font-semibold">collaborations</span>, or just having a chat about technology.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
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
                    { icon: Mail, text: user?.email, color: 'text-green-400' },
                    { icon: Phone, text: user?.phone, color: 'text-blue-400' },
                    { icon: MapPin, text: user?.location, color: 'text-purple-400' },
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
                      { icon: Github, href: user?.githubUrl, color: 'from-gray-400 to-gray-600' },
                      { icon: Linkedin, href: user?.linkedInUrl, color: 'from-blue-400 to-blue-600' },
                      { icon: Mail, href: user?.mailLink, color: 'from-green-400 to-green-600' },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href!}
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

          {/* Contact Form */}
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

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                className="bg-black/40 border-white/20 text-white placeholder:text-white/40"
                                {...field}
                                disabled={isSubmitting}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your.email@example.com"
                                className="bg-black/40 border-white/20 text-white placeholder:text-white/40"
                                {...field}
                                disabled={isSubmitting}
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Subject</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="What's this about?"
                              className="bg-black/40 border-white/20 text-white placeholder:text-white/40"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your message here..."
                              className="min-h-[120px] bg-black/40 border-white/20 text-white placeholder:text-white/40 resize-none"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </NeonBorder>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
