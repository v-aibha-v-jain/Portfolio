import React from 'react';
import { Link } from 'react-router-dom';
import profileImage from '../assets/images/profile.jpeg';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Hi, I'm <span>Vaibhav Jain</span></h1>
          <h2>Full Stack Developer</h2>
          <p>A Software Developer with experience in full-stack development, cloud technologies (AWS, Firebase), and machine learning. Contributed to more than 10 full-stack and AI projects, delivering scalable applications and collaborating effectively within team environments.</p>
          <div className="hero-buttons">
            <Link to="/work" className="btn btn-primary">View My Work</Link>
            <a href="#contact" className="btn btn-secondary" onClick={() => scrollToSection('contact')}>Contact Me</a>
          </div>
          <div className="social-icons">
            <a href="https://github.com/v-aibha-v-jain"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/vaibhavjain-"><i className="fab fa-linkedin"></i></a>
            <a href="mailto:vaibhavjain.vjv@gmail.com"><i className="fas fa-envelope"></i></a>
          </div>
        </div>
        <div className="hero-image">
          <img src={profileImage} alt="Vaibhav Jain" />
        </div>
      </div>
    </section>
  );
};

export default Hero;