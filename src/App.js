import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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
import CustomCursor from './components/CustomCursor';
import KnightSprite from './components/KnightSprite';

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
  return (
    <Router>
      <div className="App">
        <CustomCursor />
        <KnightSprite />
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
