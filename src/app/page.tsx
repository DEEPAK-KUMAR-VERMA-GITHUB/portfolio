import About from '@/components/about/About';
import Achievement from '@/components/achievement/Achievement';
import Contact from '@/components/contact/Contact';
import Footer from '@/components/footer/Footer';
import Hero from '@/components/hero/Hero';
import Project from '@/components/project/Project';
import Resume from '@/components/resume/Resume';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden">
      <Hero />
      <About />
      <Project />
      {/* <Achievement /> */}
      <Resume />
      <Contact />
      <Footer />
    </main>
  );
}
