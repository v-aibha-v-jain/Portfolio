import React, { useEffect } from 'react';
import aboutImage from '../assets/images/about.jpeg';
import reactGA from 'react-ga4';

const About = () => {

  useEffect(() => {
    reactGA.send({ hitType: "pageview", page: "/#about", title: "About Section" });
    const downloadBtn = document.querySelector('.btn.btn-primary');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
      reactGA.event({
        category: 'Button',
        action: 'Download Resume',
        label: 'About Section'
      });
      });
    }
    return () => {
      if (downloadBtn) {
      downloadBtn.removeEventListener('click', () => {});
      }
    };
  }, []);

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <h2>About Me</h2>
          <div className="underline"></div>
        </div>
        <div className="about-content">
          <div className="about-image">
            <img src={aboutImage} alt="About Me" />
          </div>
          <div className="about-text">
            <h3>Who am I?</h3>
            <p>I'm a Product Engineer and IT Consultant experienced in startup and freelance ecosystems. I build practical software solutions across frontend, backend, cloud, and automation, choosing the right technology for each product and client requirement.</p>
            <p>I enjoy turning ideas into reliable products, exploring machine learning applications, and contributing to open source. My work combines product thinking with hands-on engineering to create smarter outcomes.</p>
            <div className="about-details">
              <div className="detail">
                <i className="fas fa-user"></i>
                <div>
                  <h4>Name</h4>
                  <p>Vaibhav Jain</p>
                </div>
              </div>
              <div className="detail">
                <i className="fas fa-envelope"></i>
                <div>
                  <h4>Email</h4>
                  <p>vaibhavjain.vjv@gmail.com</p>
                </div>
              </div>
              <div className="detail">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h4>Location</h4>
                  <p>Bangalore, Karnataka, India</p>
                </div>
              </div>
            </div>
            <a href="https://drive.google.com/file/d/1mvHl1rybTlNPSy0GgmYtTYLrOLrqoHbJ/view?usp=drive_link" className="btn btn-primary" download>Download Resume</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;