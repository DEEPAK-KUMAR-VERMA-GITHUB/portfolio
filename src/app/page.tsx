import About from '@/components/about/About';
import Hero from '@/components/hero/Hero';
import Project from '@/components/project/Project'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden">
      <Hero />
      <About />
      <Project />
    </main>
  );
}
