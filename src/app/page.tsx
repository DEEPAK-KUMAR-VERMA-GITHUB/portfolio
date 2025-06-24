import About from '@/components/about/About';
import Hero from '@/components/hero/Hero';
import Project from '@/components/project/Project';
import Achievement from '@/components/achievement/Achievement';
import Resume from '@/components/resume/Resume';
import Contact from '@/components/contact/Contact';
import Footer from '@/components/footer/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden">
      <Hero />
      <About />
      <Project />
      <Achievement />
      <Resume />
      <Contact />
      <Footer />
    </main>
  );
}
