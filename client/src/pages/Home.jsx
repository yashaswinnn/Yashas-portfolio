import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useScrollContext } from '../context/ScrollContext';


export default function Home() {
  useScrollReveal();
  const { showHero } = useScrollContext();

  return (
    <div className="home-page">
      {showHero && <Loader />}
      {showHero && <Navbar />}
      <ScrollProgress />
      
      <main>
        {showHero && <Hero />}
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      </div>
      
  );
}