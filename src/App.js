import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import './App.css';
import './Portfolio.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import WorkExperience from './components/WorkExperience';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Work from './components/Work';
import CustomCursor from './components/CustomCursor';

const PortfolioPage = () => {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Skills />
      <WorkExperience />
      <Achievements />
      <Projects />
      <Certificates />
      <Contact />
    </>
  );
};

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.04,
      smoothWheel: true,
      wheelMultiplier: 0.3
    });

    window.lenis = lenis;

    return () => {
      lenis.destroy();
      if (window.lenis === lenis) {
        window.lenis = null;
      }
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <CustomCursor />
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/work" element={<Work />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
