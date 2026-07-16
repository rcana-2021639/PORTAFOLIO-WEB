import { MotionConfig } from 'framer-motion';
import Navbar from '../shared/components/Navbar/Navbar';
import Footer from '../shared/components/Footer/Footer';
import BackToTop from '../shared/components/BackToTop/BackToTop';
import CursorGlow from '../shared/components/CursorGlow/CursorGlow';
import ScrollProgress from '../shared/components/ScrollProgress/ScrollProgress';
import SceneBackground from '../shared/components/SceneBackground/SceneBackground';
import ClickSpark from '../shared/components/reactbits/ClickSpark/ClickSpark';
import CurvedLoop from '../shared/components/reactbits/CurvedLoop/CurvedLoop';
import Hero from '../features/hero/components/Hero';
import About from '../features/about/components/About';
import Skills from '../features/skills/components/Skills';
import Experience from '../features/experience/components/Experience';
import Gallery from '../features/gallery/components/Gallery';
import Projects from '../features/projects/components/Projects';
import Contact from '../features/contact/components/Contact';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ClickSpark sparkColor="#c084fc" sparkCount={9} sparkSize={11} sparkRadius={20} duration={520}>
        <SceneBackground />
        <ScrollProgress />
        <CursorGlow />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <div
            id="trayectoria-divider"
            className="section-divider"
            style={{ '--section-accent': 'var(--indigo)' }}
            aria-hidden="true"
          >
            <CurvedLoop
              marqueeText="Rhandy Caná ✦ Frontend ✦ UI · UX ✦ Full-Stack ✦"
              speed={1.4}
              curveAmount={140}
              interactive
            />
          </div>
          <Experience />
          <Gallery />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </ClickSpark>
    </MotionConfig>
  );
}

export default App;
